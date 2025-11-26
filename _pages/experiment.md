---
layout: archive
title: "Experiment Report"
permalink: /experiment-report/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

## Dataset

## Evaluation

|scene|machine|image_root|downsample|PSNR↑|SSIM↑|LPIPS↓|resolution|#gs|
|-|-|-|-|-|-|-|-|-|
|**SAGA**|
|tower_0529|docker-saga|Drone/Tower_0529$^{gs}$|8|26.67|0.9084|0.0800|654x490|4.97M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{gs}$|4|23.53|0.7965|0.1854||7.82M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{gs}$|2|22.13|0.7014|0.2973|2621x1961|8.69M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{gs}$|1|23.43|0.7798|0.2102|1600x1196|7.93M|
|**GS**|
|tower_0529|docker-gs|Drone/Tower_0529$^{gs}$|8|26.80|0.9096|0.0801|654x490|3.57M
|tower_0529|docker-gs|Drone/Tower_0529$^{gs}$|4|24.54|0.8355|0.1568|1309x979|6.34M
|**2DGS**|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|8|26.17||||2.03M|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|4|24.11||||6.81M|
|**EAGLES**|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|8|25.36|0.8684|0.1192||1.39M|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|4|23.59|0.7889|0.2054||2.46M|
|**HAC**|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|8|26.67|0.9027|0.0882||1.20M|
|tower_0529|lambda-A|Drone/Tower_0529$^{gs}$|4|24.24|0.8191|0.1745||2.20M|
|**NerfStudio-Splatfacto**|
|tower_0529|docker-nerf-studio|Drone/Tower_0529$^{ns}$|8|28.95|0.9246|0.0599||624K|
|tower_0529|docker-nerf-studio|Drone/Tower_0529$^{ns}$|4|26.84|0.8730|0.1117||1.26M|
|tower_0529|docker-nerf-studio|Drone/Tower_0529$^{ns}$|2|24.66|0.8016|0.1931||2.31M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{ns}$|1|22.52|0.7156|0.3083||3.67M|
|**NerfStudio-Splatfacto-Big**|
|tower_0529|docker-nerf-studio|Drone/Tower_0529$^{ns}$|8|29.69|0.9375|0.0485||1.72M|
|tower_0529|docker-nerf-studio|Drone/Tower_0529$^{ns}$|4|27.57|0.8951|0.0871||3.43M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{ns}$|2|25.37|0.8346|0.1469||6.30M|
|tower_0529|lambda-Utha|Drone/Tower_0529$^{ns}$|1|23.13|0.7538|0.2423||10.31M|
|**FreeFloaters**|
|tower_0529|docker-floater-free|Drone/Tower_0529$^{gs}$|8|26.97|0.9163|0.0708||4.01M|
|tower_0529|docker-floater-free|Drone/Tower_0529$^{gs}$|4|24.96|0.8589|0.1228||7.35M|
|**ScaffoldGS**|
|tower_0529|docker-scaffold-gs|Drone/Tower_0529$^{gs}$|8|26.58|0.9047|0.0832||702K|
|tower_0529|docker-scaffold-gs|Drone/Tower_0529$^{gs}$|4|23.89|0.8157|0.1683||1.06M|
|**LightGaussian**|
|tower_0529|docker-light-gs|Drone/Tower_0529$^{gs}$|8|25.51|0.8754|0.1177||1.73M

1. $data^{gs}$ Origianl GS procedure
2. $data^{ns}$ NerfStudio procedure