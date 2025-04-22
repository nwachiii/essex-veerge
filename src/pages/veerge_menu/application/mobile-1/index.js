import LayoutNavbar from '@/components/PageLayout/Layout.Navbar';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import hero_image from '/src/images/create-mobile-app/hero_image.png';
import google_play_button from '/src/images/create-mobile-app/google_play_button.svg';
import apple_store_button from '/src/images/create-mobile-app/apple_store_button.svg';
import back_icon from '/src/images/create-mobile-app/back_icon.svg';
import section_1 from '/src/images/create-mobile-app/section_1.png';
import section_2 from '/src/images/create-mobile-app/section_2.png';
import section_3 from '/src/images/create-mobile-app/section_3.png';
import section_4 from '/src/images/create-mobile-app/section_4.png';
import section_5 from '/src/images/create-mobile-app/section_5.png';
import section_6 from '/src/images/create-mobile-app/section_6.png';
import section_7 from '/src/images/create-mobile-app/section_7.png';
import mobile_theme_background from '/src/images/create-mobile-app/mobile_theme_background.svg';
import benefit_1 from '/src/images/create-mobile-app/benefit_1.svg';
import benefit_2 from '/src/images/create-mobile-app/benefit_2.svg';
import benefit_3 from '/src/images/create-mobile-app/benefit_3.svg';
import MobileAppPageSection from './MobileAppPageSection';
import MobileTheme from './MobileTheme';
import MobileAppBenefits from './MobileAppBenefits';
import {useEffect} from 'react';
import {useState} from 'react';
import MobilePageFooter from './MobilePageFooter';
import {useRouter} from 'next/router';
import {DownloadAPKComponent} from '@/components/veergeMenu/application/mobile/DownloadAPKComponent';

export default function CreateMobileApplicationPage() {
  const [current_slide, set_current_slide] = useState(0);
  const [navigating_out, set_navigating_out] = useState(false);
  const router = useRouter();

  const page_sections = [
    {
      title: 'Co-own with Family & Friends',
      text: 'With your mobile application users can invite friends & family to join them in purchasing properties seamlessly. With co-ownership, they can split the costs based on their agreed-upon sharing ratio, all while ensuring that each party remains accountable for their financial commitments. ',
      image_src: section_1.src,
    },
    {
      title: 'Auto-Pay, So you never have to worry',
      text: `A convenient service that automatically deducts the scheduled payment amount from a subscriber's bank account, ensuring timely payments. It eliminates the need for to remember due dates, thus avoiding late payment fees & also offers the flexibility to customize payment schedules, allowing for weekly, monthly, or quarterly deductions, catering to the subscriber's financial planning needs`,
      image_src: section_2.src,
    },
    {
      title: 'Notifications for longer relationship',
      text: `you can then leverage on the prowess of push notifications to ensure that the information you deliver remains pertinent. So with this you can alert users of fresh property listings, price reductions, or exclusive offers, all tailored to their preferences and search history in real time.`,
      image_src: section_3.src,
    },
    {
      title: `Fractional Ownership`,
      text: `One of the remarkable benefits offered by Veerge is the ability to fractionalize real estate without the need for intermediaries. Fractional ownership is a feature designed to provide individuals with limited purchasing power access to the real estate market, breaking down the traditional barriers to entry. `,
      image_src: section_4.src,
    },
    {
      title: `In case you need Payment Reminder`,
      text: `Enhance early payment with our automated system: Gentle payment plan reminders are sent out as timely notifications. This ensures your subscribers are always informed, just in case they forget.`,
      image_src: section_5.src,
    },
    {
      title: `Find any document with an easy search`,
      text: `Easily search and find any document related to property acquisition, thanks to the application's simplified and quick access to essential paperwork.`,
      image_src: section_6.src,
    },
    {
      title: `Track payment history on the go`,
      text: `Efficiently track all payments made and monitor outstanding balances with a comprehensive payment management tool`,
      image_src: section_7.src,
    },
  ];

  const themes = [
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
    {name: 'Coast Drew', image_src: mobile_theme_background.src, price: 8000, payment_plan: true},
  ];

  const benefits = [
    {
      title: '3X Customer Retention',
      text: 'Mobile apps offer 3X higher customer retention compared to web apps, providing a more engaging & accessible user experience.',
      image_src: benefit_1.src,
    },
    {
      title: 'Trusted Partner',
      text: 'We have established a partnership with Sterling Bank to securely process and safeguard your funds.',
      image_src: benefit_2.src,
    },
    {
      title: '50+ Countries',
      text: 'Our platform enables transactions in over 50 countries and 150+ currencies, empowering you to expand your business globally in just one day.',
      image_src: benefit_3.src,
    },
  ];

  const manage_scroll = () => {
    const sections_container = document.getElementById('sections_container');
    if (!sections_container) return;
    // console.log(sections_container.offsetTop);
    const html_element = document.documentElement;

    const scroll_percentage =
      (html_element.scrollTop - sections_container.offsetTop) / html_element.clientHeight;
    console.log(Math.min(scroll_percentage * 100));
    if (
      Math.min(scroll_percentage) >= 0 &&
      Math.min(scroll_percentage < page_sections.length * 1.5)
      // Math.min(scroll_percentage < page_sections.length * 2)
      // Math.min(scroll_percentage < page_sections.length)
    ) {
      set_current_slide(Math.floor(scroll_percentage / 1.5));
      // set_current_slide(Math.floor(scroll_percentage / 2));
      // set_current_slide(Math.floor(scroll_percentage));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', manage_scroll);
    router?.events?.on('routeChangeStart', () => set_navigating_out(true));
    router?.events?.on('routeChangeError', () => set_navigating_out(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Box position={'relative'} zIndex={'4'}> */}
      <LayoutNavbar />
      {/* </Box> */}
      <Flex
        direction={'column'}
        background={'linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)'}
        color={'white'}
      >
        <Flex
          position={'fixed'}
          top={'65px'}
          background={'rgba(255, 255, 255, 0.08)'}
          width={'100%'}
          borderBottom={'1px solid rgba(255, 255, 255, 0.08)'}
          backdropFilter={'blur(30px)'}
          padding={'18px 78px'}
          zIndex={navigating_out ? '2000' : '3'}
        >
          <Flex flex={'1'} color={'white'} gap={'12px'} align={'center'} cursor={'pointer'}>
            <Center
              padding={'9.36px'}
              borderRadius={'50%'}
              height={'36px'}
              width={'36px'}
              backgroundColor={'rgba(255, 255, 255, 0.20)'}
              onClick={() => router.back()}
            >
              <Image src={back_icon.src} alt="Back Icon" />
            </Center>
            <Text fontSize={'20px'}>Back</Text>
          </Flex>
          <Flex align={'center'} gap={'16px'}>
            <Button
              fontWeight={'400'}
              color={'white'}
              background={'#4545FE'}
              borderRadius={'8px'}
              padding={'12px 16px'}
              _hover={{background: '#4545FE'}}
              onClick={() => router.push('/veerge_menu/support_center')}
            >
              Schedule Demo
            </Button>
            <Button
              color={'white'}
              background={'transparent'}
              border={'1px solid #fff'}
              borderRadius={'8px'}
              padding={'12px 16px'}
              fontWeight={'400'}
              _hover={{background: 'transparent'}}
              onClick={() => router.push('/veerge_menu/application?web=true')}
            >
              Explore Web Applications
            </Button>
          </Flex>
        </Flex>
        <Center
          width="100%"
          // minH={'100vh'}
          flexDir={'column'}
          marginTop={'137px'}
          gap={'47.67px'}
          padding={'65px 54px 0px'}
          backgroundColor={'#031B2E'}
          position={'relative'}
        >
          <Flex
            direction={'column'}
            gap={'24px'}
            maxW={'1131px'}
            textAlign={'center'}
            align={'center'}
          >
            <Heading fontWeight={'500'} fontSize={'48px'}>
              Unlock Limitless potential with Mobile Application
            </Heading>
            <Text
              textAlign={'center'}
              maxW={'1023px'}
              fontSize={'20px'}
              color={'#CBCBCB'}
              lineHeight={'30px'}
            >
              With just <b style={{color: '#fff'}}>$14,200</b>. Empower your homebuyers with
              unmatched flexibility through our mobile application, designed to seamlessly navigate
              the entire journey of a homebuyer, from initial exploration to final purchase.
            </Text>
            <Flex align="center" justify="center" gap="44px">
              <Link href="#">
                <Image src={google_play_button.src} alt="Google Play Button" />
              </Link>
              <Link href="#">
                <Image src={apple_store_button.src} alt="Apple Store Button" />
              </Link>
            </Flex>
          </Flex>
          <Center>
            <Image src={hero_image.src} alt="Hero Image" width={'400px'} />
          </Center>
          <DownloadAPKComponent />
        </Center>
        <Flex
          direction={'column'}
          minH={'100vh'}
          w={'100%'}
          height={`${page_sections.length * 1.5 + 1.5}00vh`}
          // height={`${page_sections.length * 2 + 2}00vh`}
          // height={`${page_sections.length + 1}00vh`}
          id={'sections_container'}
        >
          <MobileAppPageSection data={page_sections[current_slide]} />
        </Flex>
        <Divider
          height={'1px'}
          border={'none'}
          backgroundColor={'#0C2841'}
          margin={'24px auto'}
          width={'1284px'}
          maxWidth={'95%'}
        />
        <Box
          padding={'78px'}
          pt={'0px'}
          maxWidth={'1284px'}
          margin={'0px auto'}
          boxSizing="content-box"
        >
          <Flex direction={'column'} gap={'16px'} maxW={'798px'} margin={'36px 0px'}>
            <Text>Available Themes</Text>
            <Text
              fontSize={'32px'}
              fontWeight={'600'}
              background={'linear-gradient(90deg, #51A093 0%, #9BF9A1 58.85%)'}
              backgroundClip={'text'}
            >
              Easy to use. Easy to love.
            </Text>
            <Text fontSize={'20px'}>
              Browse through our diverse range of available themes and select the one that best
              suits your preference to enhance your user experience.{' '}
            </Text>
          </Flex>
          <Grid templateColumns={'repeat(3, 1fr)'} gap={'24px'} mt={'36px'}>
            {themes.map((theme, index) => (
              <MobileTheme key={index} data={theme} />
            ))}
          </Grid>
        </Box>
        <Box background={'#031B2E'}>
          <Box maxW={'1284px'} margin={'0px auto'} boxSizing="content-box" padding={'65px'}>
            <Grid templateColumns={'repeat(3, 1fr)'} gap={'42px'}>
              {benefits.map((benefit, index) => (
                <MobileAppBenefits key={index} data={benefit} />
              ))}
            </Grid>
          </Box>
          <Center flexDirection={'column'} padding={'32px 65px'} gap={'16px'} mb={'24px'}>
            <Text
              fontSize={'56px'}
              fontWeight={'500'}
              background={'linear-gradient(90deg, #51A093 0%, #9BF9A1 58.85%)'}
              backgroundClip={'text'}
              fontFamily={'Syne'}
            >
              We are available to help, 24/7.
            </Text>
            <Button
              color={'white'}
              background={'transparent'}
              border={'1px solid #fff'}
              borderRadius={'8px'}
              padding={'16px 24px'}
              fontWeight={'400'}
              _hover={{background: 'transparent'}}
            >
              Contact Support
            </Button>
          </Center>
          <MobilePageFooter />
        </Box>
      </Flex>
    </>
  );
}
