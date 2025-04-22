const road_map_data = [
  {
    date: 'April 2024',
    tagName: 'iBuyer',
    description:
      'Introducing our groundbreaking iBuyer update, empowering development companies to automate the property buyback process. With this innovative feature, businesses can seamlessly repurchase properties with enhanced efficiency and convenience.',
    color: 'mainGreen',
  },
  {
    date: 'March 2024',
    tagName: 'Facility Management',
    description:
      'Introducing the highly anticipated Facility Management Update on Veerge. Now, businesses can efficiently manage and handle property rentals with an advanced and streamlined rental system. This comprehensive update empowers development companies with a more efficient approach to rental management, enhancing their capabilities and ensuring seamless operations for their properties.',
    color: 'darkBlue',
  },
  {
    date: 'February 2024',
    tagName: 'Veerge Mobile Application',
    description:
      'Veerge is currently unavailable on mobile, Veerge will be introducing an exciting update. Development companies will be able to download the Veerge application, enabling them to effortlessly track and manage all aspects of their business from anywhere. With this user-friendly mobile solution, businesses gain unparalleled convenience and control to stay on top of their operations and maximize productivity on the go.',
    color: 'orange',
  },
  {
    date: 'January 2024',
    tagName: 'Smart contracts',
    description:
      'An autonomous computer program code that facilitates, executes and enforces the negotiation and performance of a certain contract (agreement) when certain conditions are met.',
    color: 'darkGreen',
  },
  {
    date: 'December 2023',
    tagName: 'Loop for all accounts',
    description: 'Loop will be available to everyone',
    color: 'redBrown',
  },
  {
    date: 'November 2023',
    tagName: 'Secondary market place',
    description: 'Secondary market place will be available to everyone.',
    color: 'deepBlue',
  },
  {
    date: 'October 2023',
    tagName: 'Smart payment plan Launch',
    description: 'Smart payment plan will be available to everyone.',
    color: 'purple',
  },
  {
    date: 'September 2023',
    tagName: 'Ticket for all accounts',
    description: 'Ticket will be available for all accounts regardless of subscription type.',
    color: 'mainGreen',
  },
  {
    date: 'August 2023',
    tagName: 'Ticket for support Tier 3',
    description:
      'Exclusively available to Tier 3 subscribers, the Ticket feature serves as a dedicated channel for handling enquiries and disputes. With Tickets, customers can conveniently raise and track their questions or concerns, while businesses can efficiently manage and resolve these issues, ensuring excellent customer service and dispute resolution capabilities.',
    color: 'deepBlue',
    current: true,
  },
  {
    date: 'July 2023',
    tagName: 'Smart payment plan Beta',
    description: 'We automated payment plan, the time has come to Re-engineer it. Learn more',
    color: 'redBrown',
  },
  {
    date: 'June 2023',
    tagName: 'Themes for Mobile applications',
    description:
      "Themes bring a new level of customization to Veerge Plus subscribers. Now, you can effortlessly align your mobile application's theme with your brand identity, ensuring a seamless and consistent user experience. With this exciting feature, Veerge Plus subscribers can personalize their app's appearance and create a captivating interface that reflects their unique brand identity.",
    color: 'orange',
  },
  {
    date: 'May 2023',
    tagName: 'Loop for Tier 3',
    description:
      "Introducing Loop, an exclusive feature available with our Tier 3 subscription. Elevate your team's productivity with a dynamic digital workspace, where members can communicate seamlessly through messages, share files effortlessly, and collaborate efficiently on various projects. With Loop, take your team's collaboration to the next level and unlock new heights of productivity.",
    color: 'darkGreen',
  },
  {
    date: 'April 2023',
    tagName: 'Secondary market place for Tier 3',
    description:
      'This exclusive feature is available for Tier 3 subscribers only. With this upgrade, home buyers gain the ability to sell properties on the secondary marketplace, while development companies can charge a transaction processing fee. This exciting addition opens up new avenues for property owners and developers to maximize their investments and create a dynamic ecosystem within the platform.',
    color: 'purple',
  },
  {
    date: 'March 2023',
    tagName: 'Drive',
    description:
      'Experience the power of Drive - where all your documents come together in one place. Say goodbye to scattered files and embrace seamless organisation as Drive provides a centralised hub for all your important documents, making it easier than ever to access and manage your files efficiently.',
    color: 'redBrown',
  },
  {
    date: 'February 2023',
    tagName: 'Notes',
    description:
      "With our latest update, Notes feature gets even better! Now, you can effortlessly jot down important information you don't want to forget, and set convenient reminders. Stay organized and never miss a beat as you keep track of essential tasks and ideas with ease, all within the Notes section.",
    color: 'darkGreen',
  },
  {
    date: 'January 2023',
    tagName: 'Insight',
    description:
      'Unlock endless possibilities with Artificial intelligence and take your property development company to new heights. With our data-driven insights, development companies can now make informed decisions that drive success. Embrace the power of AI-driven analytics and gain a competitive edge by leveraging valuable data to optimize every aspect of your property development projects.',
    color: 'purple',
  },
  {
    date: 'December 2022',
    tagName: 'Cooperate accounts',
    description:
      'Now, corporate accounts can easily sign up on the applications built on Veerge. This enhancement allows businesses and organizations to access the full range of features and benefits offered by Veerge-powered applications.',
    color: 'deepBlue',
  },
  {
    date: 'November 2022',
    tagName: 'International Paymnts',
    description:
      'Our latest update enables development companies to seamlessly accept payments in over 75 countries and across more than 160 currencies, all without the need to set up a local entity. This breakthrough feature empowers businesses to expand their global reach, effortlessly transact with international clients, and unlock new growth opportunities, all through a hassle-free and borderless payment system.',
    color: 'mainGreen',
  },
  {
    date: 'Ocotber 2022',
    tagName: 'Co-ownership',
    description:
      'With our new application update, users can effortlessly invite friends and family to join them in purchasing properties together, allowing them to divide the ownership in a way that best suits their preferences. This exciting feature fosters collaborative property ownership, empowering users to create investment opportunities and share the benefits of real estate with their loved ones, all through a user-friendly and customizable platform.',
    color: 'deepBlue',
  },
  {
    date: 'September 2022',
    tagName: 'Fractional',
    description:
      'Development companies can now fractionalize properties, making real estate investment accessible and affordable for individuals with lower purchasing power. Through Veerge, a broader segment of the population can now participate in property ownership, empowering more people to benefit from real estate opportunities and build their wealth with ease.',
    color: 'orange',
  },
  {
    date: 'August 2022',
    tagName: 'Applications',
    description:
      'With this extension of Veerge, businesses can now effortlessly create web applications without writing a single line of code. This innovative application streamlines the entire end-to-end journey of a home buyer, simplifying everything from property inspection to seamless purchase and efficient payment tracking. With all documentation conveniently accessible in one centralized location, Veerge empowers businesses to offer a seamless and user-friendly experience to their customers throughout the entire home buying process.',
    color: 'redBrown',
  },
  {
    date: 'July 2022',
    tagName: 'Veerge',
    description:
      'Veerge CRM with a comprehensive suite of powerful features, including Customer 360, Transaction Management, Revenue Recognition Solution, Inventory Management, and Role-Based Access Control. With this integrated solution, businesses can seamlessly streamline transactions, ensure accurate revenue recognition, optimize inventory operations, and maintain strict access controls for enhanced security and efficiency.',
    color: 'darkGreen',
  },
];

export const colorPicker = {
  mainGreen: ['#12D8A0', 'rgba(18, 216, 160, 0.10)'],
  darkBlue: ['#103F5D', 'rgba(16, 63, 93, 0.10)'],
  orange: ['#FF9103', 'rgba(255, 145, 3, 0.10)'],
  darkGreen: ['#105B47', 'rgba(16, 91, 71, 0.10)'],
  redBrown: ['#8C2828', 'rgba(140, 40, 40, 0.10)'],
  deepBlue: ['#0E85B4', 'rgba(14, 133, 180, 0.10)'],
  purple: ['#5129CC', 'rgba(81, 41, 204, 0.10)'],
};

export default road_map_data;
