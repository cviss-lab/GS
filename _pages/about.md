---
permalink: /
title: "Gaussian Splatting Performance Benchmark"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

## Overview

<iframe id="viewer" width="800" height="500" allow="fullscreen; xr-spatial-tracking" src="https://superspl.at/s?id=e818cc56"></iframe>

This webpage provides a comprehensive performance benchmark for various Gaussian Splatting methods, including SAGA, GS, 2DGS, EAGLES, HAC, NerfStudio-Splatfacto, and more.

## Metrics

We use PSNR, SSIM, and LPIPS as image quality metrics, while also recording the number of Gaussians and training time to evaluate efficiency.

## Experimental Setup

Tests were conducted on NVIDIA A100 and RTX 4090 GPUs with different downsampling factors (1x, 2x, 4x, 8x) to evaluate each method's performance at various resolutions.

## Key Findings

NerfStudio-Splatfacto-Big achieves the highest PSNR (~29.7 dB) and lowest LPIPS at downsampling factor 8. HAC and EAGLES demonstrate good efficiency by maintaining high rendering quality while using relatively fewer Gaussians.

Comparing training from 7k to 30k iterations, most methods show improvement with longer training, with GS and EFA-Mip-GS showing the most significant gains.

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). You are free to use, share, and adapt this content with proper attribution.

## Citation

If you find this work helpful, please cite:

```bibtex
@misc{li2025gsbenchmark,
    author = {Li, Huibin},
    title = {Gaussian Splatting Performance Benchmark},
    year = {2025},
    url = {https://cviss-lab.github.io/GS}
}
```