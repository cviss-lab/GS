---
permalink: /
title: "Gaussian Splatting Performance Benchmark"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

## Overview

<iframe id="viewer" width="100%" height="500" allow="fullscreen; xr-spatial-tracking" src="https://superspl.at/s?id=e818cc56"></iframe>

This webpage provides a comprehensive performance benchmark for various Gaussian Splatting methods, including SAGA, GS, 2DGS, EAGLES, HAC, NerfStudio-Splatfacto, and more.

## Dataset

The performance benchmark datasets used for not is as follows:

|Dataset|Link|Scene Type|Data Type|
|---|---|---|---|
|Our Dataset|[Tower_0529](https://drive.google.com/drive/folders/1fhijwyJRplX8Qp4acy6EQCGbkES0AAvb?usp=drive_link)|Outdoor|Real-World|
|MipNeRF360|[MipNeRF360](https://jonbarron.info/mipnerf360/)|Mixed|Real-World|

Other types of datasets planned in the future:
- Scene Type
  - Indoor (Room, Building Interior)
  - Outdoor (Urban, Natural, Wild)
  - Dynamic
  - Object-Centric
- Data Type
  - Real-World
  - Synthetic

## Metrics

We use PSNR, SSIM, and LPIPS as image quality metrics, while also recording the number of Gaussians and training time to evaluate efficiency.

Note that images at different resolutions are compared against their corresponding training images at the same downsampling factor:

$$\text{Metric} = f(I_k, \widetilde{I}_k)$$

where $k$ denotes the downsampling factor, $I_k$ and $\widetilde{I}_k$ is the corresponding ground truth and synthetic image at downsampling factor $k$. As a result, PSNR tends to decrease at higher resolutions (lower downsampling factors) due to the increased difficulty of reconstruction.

> Notes: For GSplat, we use the code it provides to evaluate the Gaussian splatting results, which uses `torchmetrics` to compute PSNR, LPIPS, and SSIM, rather than `lpipsPyTorch`. For consistency with other methods, we also use the `vgg` model in `torchmetrics` to compute LPIPS.

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
@misc{cviss2025gsbenchmark,
    author = {Li, Huibin},
    title = {Gaussian Splatting Performance Benchmark},
    year = {2025},
    url = {https://cviss-lab.github.io/GS},
    organization = {CVISS Lab},
    note = {\url{https://cviss.net/}}
}
```