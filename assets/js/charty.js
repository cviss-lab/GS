const charty = (function() {
    let sheetsUrls = {
        Ours: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSgRb1CWKFvn_Yx-AJucuj9uEk9Xblfepoyr2qRcjG8m-mL7mCeNm78Pv0QuMTlVuf6rGFBaPF0bfdD/pub?gid=0&single=true&output=csv',
        MipNerf360: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSgRb1CWKFvn_Yx-AJucuj9uEk9Xblfepoyr2qRcjG8m-mL7mCeNm78Pv0QuMTlVuf6rGFBaPF0bfdD/pub?gid=1489703980&single=true&output=csv'
    };

    let palette = [
        '#7a9fdc', '#f4a876', '#8fdb8a', '#e38888', '#b18fca', '#a9806a', '#e8a4d6', '#9a9a9a', '#e3d08f', '#a7dbee',
        '#4878d0', '#ee854a', '#6acc64', '#d65f5f', '#956cb4', '#8c613c', '#dc7ec0', '#797979', '#d5bb67', '#82c6e2',
        '#2e5aa8', '#d66b28', '#4ab345', '#c03a3a', '#7a4e9d', '#6f4623', '#ca5aa9', '#5a5a5a', '#c4a73f', '#5bb0d5',
        '#1d4580', '#b5561a', '#359a2e', '#a02525', '#5f3880', '#543316', '#b03d91', '#3e3e3e', '#a88d25', '#3a95bf'
    ];

    let markerShapes = {
        '1': 'circle',
        '2': 'square',
        '4': 'diamond',
        '8': 'cross'
    };

    function getCurrentTheme() {
        const html = document.documentElement;
        const body = document.body;
        
        if (html.classList.contains('dark') || 
            body.classList.contains('dark') ||
            html.getAttribute('data-theme') === 'dark' ||
            body.getAttribute('data-theme') === 'dark') {
            return 'dark';
        }
        return 'light';
    }

    function getThemedLayoutBase() {
        const isDark = getCurrentTheme() === 'dark';
        
        return {
            font: {
            family: 'Times New Roman, serif',
            size: 14,
            color: isDark ? '#e0e0e0' : '#000'
            },
            paper_bgcolor: isDark ? 'rgba(0,0,0,0)' : '#fff',
            plot_bgcolor: isDark ? '#2d2d2d' : '#fff',
            margin: {t: 60, b: 80, l: 70, r: 100},
            xaxis: {
            showline: true,
            linewidth: 1.5,
            linecolor: isDark ? '#666' : '#000',
            mirror: true,
            ticks: 'outside',
            tickwidth: 1,
            tickcolor: isDark ? '#666' : '#000',
            tickfont: {size: 11, color: isDark ? '#e0e0e0' : '#000'},
            showgrid: false,
            tickangle: -30
            },
            yaxis: {
            showline: true,
            linewidth: 1.5,
            linecolor: isDark ? '#666' : '#000',
            mirror: true,
            ticks: 'outside',
            tickwidth: 1,
            tickcolor: isDark ? '#666' : '#000',
            tickfont: {size: 11, color: isDark ? '#e0e0e0' : '#000'},
            showgrid: true,
            gridcolor: isDark ? '#444' : '#e0e0e0',
            gridwidth: 0.5,
            zeroline: false
            },
            legend: {
            orientation: 'v',
            yanchor: 'middle',
            y: 0.5,
            xanchor: 'left',
            x: 1.02,
            font: {size: 10, color: isDark ? '#e0e0e0' : '#000'},
            bordercolor: isDark ? '#666' : '#ccc',
            borderwidth: 1,
            bgcolor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)' 
            },
            bargap: 0.2,
            bargroupgap: 0.1
        };
    }

    function getThemedBarStyle() {
        const isDark = getCurrentTheme() === 'dark';
        return {
            line: {color: isDark ? '#666' : '#000', width: 0.5}
        };
    }



    function formatTime(secs) {
        if (!secs) return 'N/A';
        if (secs >= 3600) {
            return `${Math.floor(secs/3600)}h ${Math.floor((secs%3600)/60)}m ${Math.round(secs%60)}s`;
        }
        if (secs >= 60) {
            return `${Math.floor(secs/60)}m ${Math.round(secs%60)}s`;
        }
        return `${secs}s`;
    }

    function parseHMS(val) {
        const parts = String(val).split(':').map(Number);
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        }
        return parseFloat(val) || 0;
    }

    function lightenColor(hex, factor) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        r = Math.round(r + (255 - r) * factor);
        g = Math.round(g + (255 - g) * factor);
        b = Math.round(b + (255 - b) * factor);
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }


    const dataManager = {
        // 原始数据
        rawData: null,
        
        // 全局唯一值
        uniqueScenes: null,
        uniqueMethods: null,
        uniqueDownsampling: null,
        
        // 颜色映射
        colorMap: null,
        colorMapLight: null,

        // 初始化数据
        init: function(rawData, datasetName) {
            this.rawData = rawData.filter(d => d.method);
            if (datasetName)
                this.rawData = this.rawData.filter(d => d.dataset === datasetName);
            this._processGlobalData();
            return this;
        },
        
        // 预处理全局数据
        _processGlobalData: function() {
            if (!this.rawData || this.rawData.length === 0) {
                console.warn('No data to process');
                return;
            }
            
            // 提取所有唯一值
            this.uniqueScenes = [...new Set(this.rawData.map(d => d.scene))].sort();
            this.uniqueMethods = [...new Set(this.rawData.map(d => d.method))];
            this.uniqueDownsampling = [...new Set(this.rawData.map(d => d.downsampling))].sort((a, b) => b - a);
            
            // 生成颜色映射
            this.colorMap = {};
            this.uniqueMethods.forEach((m, i) => {
                this.colorMap[m] = palette[i % palette.length];
            });
            
            // 生成浅色映射
            this.colorMapLight = {};
            this.uniqueMethods.forEach(m => {
                this.colorMapLight[m] = lightenColor(this.colorMap[m], 0.5);
            });
        },
        
        // 获取特定 scene 的子集（核心方法）
        subset: function(datasetName, sceneName) {
            if (!this.rawData) {
                console.error('Data not initialized. Call init() first.');
                return null;
            }
            
            result = {};
            let data = null;
            if (!sceneName || !datasetName) {
                data = this.rawData;
                result = {
                    uniqueMethods: this.uniqueMethods,
                    uniqueDownsampling: this.uniqueDownsampling
                }
            }else{
                var subsetData = this.rawData.filter(d => d.scene === sceneName && d.dataset === datasetName);
                
                if (subsetData.length === 0) {
                    console.warn(`No data found for scene: ${sceneName}`);
                    return null;
                }

                var sceneMethods = [...new Set(subsetData.map(d => d.method))];
                var sceneDownsampling = [...new Set(subsetData.map(d => d.downsampling))].sort((a, b) => b - a);
                result = {
                    uniqueMethods: sceneMethods,
                    uniqueDownsampling: sceneDownsampling,
                };
                data = subsetData;
            }
            result.data = data;
            result.gpu = data.map(d => d.gpu);
            result.times = data.map(d => parseHMS(d.times));
            result.methods = data.map(d => d.method);
            result.train_render_times = data.map(d => parseHMS(d.train_render_times));
            result.train_optimal_times = data.map(d => parseHMS(d.train_optimal_times));

            return result;  
        },
        
        // 获取所有 scenes
        getScenes: function() {
            return this.uniqueScenes || [];
        },
        
        // 获取全局数据摘要
        getSummary: function() {
            return {
                totalRows: this.rawData ? this.rawData.length : 0,
                scenes: this.uniqueScenes,
                methods: this.uniqueMethods,
                downsamplingFactors: this.uniqueDownsampling
            };
        },
        
        // 获取特定 scene 和 method 的数据
        getMethodData: function(sceneName, methodName) {
            if (!this.rawData) return [];
            return this.rawData.filter(d => 
                d.scene === sceneName && d.method === methodName
            );
        },
        
        // 检查是否已初始化
        isInitialized: function() {
            return this.rawData !== null && this.rawData.length > 0;
        }
    };

    return {
        getThemedLayoutBase: getThemedLayoutBase,
        getThemedBarStyle: getThemedBarStyle,
        getCurrentTheme: getCurrentTheme,
        formatTime: formatTime,
        parseHMS: parseHMS,
        sheetsUrls: sheetsUrls,
        palette: palette,
        markerShapes: markerShapes,
        lightenColor: lightenColor,
        dataManager: dataManager
    }
})();

window.charty = charty;