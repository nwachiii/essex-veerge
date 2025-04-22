import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';

const HowWeProtectYouMainContent = ({
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
  yourResponsibilities,
  feesAndTaxes,
  confidentiality,
  limitationOfLiability,
  intellectualProperty,
  betaServices,
  feedback,
  privacyPolicy,
  modifications,
  generalConditions,
}) => {
  return (
    <Stack fontFamily="Euclid Circular B" pb="86px">
      <Box>
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="32px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
        >
          {`HOW YOU'RE PROTECTED`}
        </Text>
        <Text
          color="#606060"
          fontSize="14px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          mt="15px"
        >
          Published: November 1, 2022
        </Text>
      </Box>
      <Stack spacing={'20px'} mt="30px">
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
        {`  By now, you are hopefully familiar with our mission: To democratize real estate for all!
          We believe that everyone should have access to the tools they need to thrive financially.
          However, our vision goes beyond accessibility; we strive to be the most trusted, lowest
          cost, and culturally-relevant software company in the industry. We understand that the
          majority of our users are venturing into the world of value creation and investment for
          the first time. That's why we place the utmost importance on the reliability of our
          platform. We want to be there for our customers when they need us the most, providing a
          secure and trustworthy experience.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`While we strongly advocate for democratization and the power of participation, we hold
          "Safety First" as our top company value. After all, democratization without safety would
          be reckless. We are committed to being a safety-first company, ensuring that our customers
          can explore the world of finance with confidence.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
        {`  Just as we prioritize safety internally, we believe that the values our customers
          attribute to us over time will reflect our commitment to their security and well-being. In
          today's digital age, where the internet serves as a powerful tool to reach potential
          customers, data protection has become more crucial than ever.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Unfortunately, cyber-attacks and data breaches have been on the rise, posing significant
          risks to individuals and organizations. At Veerge, we recognize the importance of data
          protection, particularly for real estate companies that handle sensitive personal and
          financial information on a daily basis.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          To safeguard your data and provide the highest level of security, we have implemented
          comprehensive data protection measures. Our SaaS product is specifically designed to
          assist real estate companies in building web applications that facilitate the seamless
          selling of properties to customers. However, our commitment to data protection goes beyond
          that.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          In this section, we will walk you through the robust data protection measures we have put
          in place, aligning with GDPR, NDPR, NITDA, and CCPA regulations. We want you to have
          complete peace of mind when using our platform, knowing that your data is in safe hands.We
          employ state-of-the-art security protocols to fortify your organization, and we take
          security seriously by leaving no stone unturned in protecting your sensitive information
          from prying eyes.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Our security protocols act as an impenetrable shield, ensuring that unauthorized access is
          prevented. Two-factor authentication, regular password updates, and access controls are
          just a few of the measures we implement to limit access to sensitive data, allowing only
          authorized individuals to enter.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Complacency has no place in our fortress. We conduct regular security audits and updates
          to strengthen our systems against the ever-evolving threats of the digital realm. Our
          vigilant security team keeps a watchful eye on our systems, swiftly responding to any
          suspicious activity or security incidents.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          When it comes to encryption, we raise the bar even higher. All data transmitted between
          our servers and your devices is encrypted using cutting-edge industry-standard protocols.
          Intercepting this encrypted data would be futile, as it remains indecipherable to anyone
          without the key.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Passwords are fortified using the BCrypt hashing algorithm, rendering them virtually
          impossible to crack. We never store passwords in plain text, ensuring an additional layer
          of protection for your sensitive information. Social Security numbers and other sensitive
          data are encrypted before being stored securely. Our app and website utilize the Transport
          Layer Security (TLS) protocol to establish secure communication with our servers,
          safeguarding your personal and account information.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          To enhance the resilience of your data, we regularly perform encrypted backups. These
          backups are securely stored in offsite locations, guaranteeing the safety of your
          information even in the face of unforeseen disasters. During the backup process, we
          conduct meticulous security audits, ensuring that your data remains protected from insider
          attacks or any malicious attempts.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          We understand the power of collaboration and have partnered with trusted third-party
          service providers, such as payment processors, who share our commitment to data
          protection. These partners adhere to stringent measures, ensuring the security of your
          information throughout the payment process.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`We've implemented two-factor authentication (2FA) as an additional layer of defense. This powerful mechanism requires two sources of verification to access your account, providing an extra level of security even if someone gains access to your password. `}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`We recognize that different regions and industries have unique regulations and compliance requirements for data protection. That's why we diligently ensure that our platform complies with all relevant regulations, including GDPR, NDPR, NITDA, and CCPA. Our dedicated compliance team stays informed about evolving regulations, ensuring that our platform consistently meets the highest standards. With Veerge, you can have full confidence that your data is handled in complete compliance with applicable regulations`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`Join us in our secure fortress, where we are committed to democratizing real estate while safeguarding your data and financial future. At Veerge, we combine accessibility, trust, affordability, and cultural relevance to provide you with a seamless and secure experience.`}
        </Text>
      </Stack>
      <Stack spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="28px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
          w="100%"
        >
          {`MITIGATION AGAINST DOWNTIME`}
        </Text>

        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Mitigating downtime is crucial to ensure the availability and reliability of services. To
          address potential downtime, Veerge has implemented several measures while leveraging
          Myxellia microservices built on AWS (Amazon Web Services), a highly reliable cloud
          computing platform. These mitigants include:
        </Text>
        <Stack as="ol" w="621px" pl="10px">
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Multi-region Architecture:`}</b> Applications are
              deployed across multiple AWS regions. By distributing resources geographically, Veerge
              ensures that even if one region experiences downtime, the application remains
              accessible in other regions.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>2.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Load Balancing: </b> AWS Elastic Load Balancer is
              utilized to evenly distribute incoming traffic across multiple instances or
              availability zones. This load balancing mechanism enhances high availability and fault
              tolerance, enabling continuous access to the application even if certain instances or
              zones experience downtime.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>3.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Auto Scaling: </b> AWS Auto Scaling is implemented to
              automatically adjust the number of instances based on traffic demand. This dynamic
              scaling capability ensures the application can handle increased traffic during peak
              periods and scale down during lower demand, reducing the risk of downtime due to
              resource limitations.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>4.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Fault-Tolerant Architectures: `}</b>Veerge designs
              applications to be fault-tolerant by incorporating redundancy and backup mechanisms.
              AWS services like Amazon S3 are utilized for data backup and replication, while
              services like Amazon RDS Multi-AZ ensure database replication and high availability.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>5.</span>
            <span>
              <b style={{fontWeight: '700'}}>{`Disaster Recovery: `}</b>Veerge creates and regularly
              tests disaster recovery plans to ensure business continuity in the event of a major
              outage. AWS Backup and AWS Disaster Recovery services are employed to automate and
              streamline the recovery process.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>6.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Monitoring and Alerting: `}</b>Veerge sets up
              monitoring and alerting using AWS CloudWatch. Key metrics are continuously monitored,
              and notifications are established to proactively identify and address any potential
              issues promptly.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>7.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Regular Backup and Data Replication: `}</b> Veerge
              implements regular backup strategies for critical data and ensures data replication
              across different AWS regions. This approach safeguards data against potential loss or
              corruption during downtime events.
            </span>
          </Text>
        </Stack>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          By employing these mitigants, Veerge aims to minimize the impact of potential downtime and
          maintain a highly available and reliable service for its users.
        </Text>
      </Stack>
    </Stack>
  );
};

export default HowWeProtectYouMainContent;
