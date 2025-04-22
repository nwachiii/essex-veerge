import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';

export const themeColorMode = {
  modernMinimalism: [
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/modernMinimalismLight.png',
      starting_price: formatNumberWithCommas(3000, {style: 'currency', currency: 'USD'}),
      key: 'light',
      mode: 'Light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyModernMinimalism.png',
      starting_price: formatNumberWithCommas(3200, {style: 'currency', currency: 'USD'}),
      key: 'dark',
      mode: 'Dark',
      demo_link: '#',
    },
    {
      thumb_nail:
        'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/modernMinimalismDarkBlue.png',
      starting_price: formatNumberWithCommas(3000, {style: 'currency', currency: 'USD'}),
      key: 'darkBlue',
      mode: 'Dark Blue',
      demo_link: '#',
    },
    {
      thumb_nail:
        'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/modernMinimalismDarkGreen.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      key: 'darkGreen',
      mode: 'Dark Green',
      demo_link: '#',
    },
  ],
  brochure: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightBrochure.png',
      starting_price: formatNumberWithCommas(10000, {style: 'currency', currency: 'USD'}),
      key: 'light',
      mode: 'Light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyBrochure.png',
      starting_price: formatNumberWithCommas(10200, {style: 'currency', currency: 'USD'}),
      key: 'dark',
      mode: 'Dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueBrochure.png',
      starting_price: formatNumberWithCommas(10000, {style: 'currency', currency: 'USD'}),
      key: 'darkBlue',
      mode: 'Dark Blue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenBrochure.png',
      starting_price: formatNumberWithCommas(10300, {style: 'currency', currency: 'USD'}),
      key: 'darkGreen',
      mode: 'Dark Green',
      demo_link: '#',
    },
  ],

  vintageCharm: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightVinatgeCharm.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyVintageCharm.png',
      starting_price: formatNumberWithCommas(4000, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueVintageCharm.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenVintageCharm.png',
      starting_price: formatNumberWithCommas(4100, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  coastalRetreat: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightCoastalRetreat.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyCoastalRetreat.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueCoastalRetreat.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/NewThumbnails/DarkGreenCoastalRetreat.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  scandinavianElegance: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightScandinavianElegance.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyScandinavianElegance.png',
      starting_price: formatNumberWithCommas(3700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueScandinavianElegance.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenScandinavianElegance.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  industrialLoft: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightIndustrialLoft.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyIndustrialLoft.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueIndustrialLoft.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenIndustrialLoft.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  rusticCharm: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightRusticCharm.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyRusticCharm.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueRusticCharm.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenRusticCharm.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  urbanChic: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightUrbanChic.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyUrbanChic.png',
      starting_price: formatNumberWithCommas(3700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueUrbanChic.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenUrbanChic.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],
  mountainLodge: [
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/mountainLodgeLight.png',
      starting_price: formatNumberWithCommas(4000, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/mountainLodgeDark.png',
      starting_price: formatNumberWithCommas(4200, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/mountainLodgeDarkBlue.png',
      starting_price: formatNumberWithCommas(4000, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/mountainLodgeDarkGreen.png',
      starting_price: formatNumberWithCommas(4300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  suburbanSerenity: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightSuburbanSerenity.png',
      starting_price: formatNumberWithCommas(4000, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreySuburbanSerenity.png',
      starting_price: formatNumberWithCommas(4200, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueSuburbanSerenity.png',
      starting_price: formatNumberWithCommas(4000, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenSuburbanSerenity.png',
      starting_price: formatNumberWithCommas(4300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  desertOasis: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightDesertOasis.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyDesertOasis.png',
      starting_price: formatNumberWithCommas(3700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueDesertOasis.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenDesertOasis.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  artisticAbode: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightArtisticAbode.png',
      starting_price: formatNumberWithCommas(2500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyArtisticAbode.png',
      starting_price: formatNumberWithCommas(2700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueArtisticAbode.png',
      starting_price: formatNumberWithCommas(2500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenArtisticAbode.png',
      starting_price: formatNumberWithCommas(2800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  snowyHaven: [
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/snowyHavenLight.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/snowyHavenDark.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/snowyHavenDarkBlue.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/snowyHavenDarkGreen.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  nordicHygge: [
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/nordicHyggeLight.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/nordicHyggeDark.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/nordicHyggeDarkBlue.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/nordicHyggeDarkGreen.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  retroRevival: [
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/retroRevivalLight.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/retroRevivalDark.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/retroRevivalDarkBlue.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1tfxqgzlmg1r3.cloudfront.net/mobile-themes/retroRevivalDarkGreen.png',
      starting_price: formatNumberWithCommas(1500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  artDecoGem: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightArtDecoGem.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyArtDecoGem.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueArtDecoGem.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenArtDecoGem.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],
  bohemianHideaway: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightBohemianHideaway.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyBohemianHideaway.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueBohemianHideaway.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenBohemianHideaway.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  mediterraneanOasis: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightMediterraneanOasis.png',
      starting_price: formatNumberWithCommas(10000, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyMediterraneanOasis.png',
      starting_price: formatNumberWithCommas(10200, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueMediterraneanOasis.png',
      starting_price: formatNumberWithCommas(10000, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenMediterraneanOasis.png',
      starting_price: formatNumberWithCommas(10300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  Terracotta: [
    {
      thumb_nail:
        'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/Screenshot+2024-08-27+at+6.06.44%E2%80%AFPM.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail:
        'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/Screenshot+2024-08-27+at+6.08.28%E2%80%AFPM.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail:
        'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/Screenshot+2024-08-27+at+6.08.28%E2%80%AFPM.png',
      starting_price: formatNumberWithCommas(3300, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail:
        'https://elasticbeanstalk-us-east-1-366943739396.s3.amazonaws.com/resources/Screenshot+2024-08-27+at+6.08.28%E2%80%AFPM.png',
      starting_price: formatNumberWithCommas(3600, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  // BELOW => PORTFOLIO THEMES: store clones with only a few selected features

  portfolioModernMin: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyModernPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2200, {style: 'currency', currency: 'USD'}),
      key: 'dark',
      mode: 'Dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueModernPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2000, {style: 'currency', currency: 'USD'}),
      key: 'darkBlue',
      mode: 'Dark Blue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightModernPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2000, {style: 'currency', currency: 'USD'}),
      key: 'light',
      mode: 'Light',
      demo_link: '#',
    },

    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenModernPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2300, {style: 'currency', currency: 'USD'}),
      key: 'darkGreen',
      mode: 'Dark Green',
      demo_link: '#',
    },
  ],
  portfolioTerracotta: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightTerraPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyTerraPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueTerraPortfolioTheme.png',

      starting_price: formatNumberWithCommas(2500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenTerraPortfolioTheme.png',
      starting_price: formatNumberWithCommas(2800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],

  tropicalParadise: [
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/LightTropicalParadise.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Light',
      key: 'light',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreyTropicalParadise.png',
      starting_price: formatNumberWithCommas(3700, {style: 'currency', currency: 'USD'}),
      mode: 'Dark',
      key: 'dark',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkBlueTropicalParadise.png',
      starting_price: formatNumberWithCommas(3500, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Blue',
      key: 'darkBlue',
      demo_link: '#',
    },
    {
      thumb_nail: 'https://d1x2tneac0i3nn.cloudfront.net/DarkGreenTropicalParadise.png',
      starting_price: formatNumberWithCommas(3800, {style: 'currency', currency: 'USD'}),
      mode: 'Dark Green',
      key: 'darkGreen',
      demo_link: '#',
    },
  ],
};
