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
    return {
        getThemedLayoutBase: getThemedLayoutBase,
        getThemedBarStyle: getThemedBarStyle,
        getCurrentTheme: getCurrentTheme,
        formatTime: formatTime,
        parseHMS: parseHMS,
        sheetsUrls: sheetsUrls,
        palette: palette
    }
})();

window.charty = charty;