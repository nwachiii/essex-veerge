import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';
import {BsDot} from 'react-icons/bs';

const WhyVeergeMainContent = ({whyVeerge, ourMission, ourCulture, ourValues}) => {
  return (
    <Stack fontFamily="Euclid Circular B" pb="86px">
      <Box>
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="28px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          WHY VEERGE INSTEAD OF BUILDING?
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
          Published: December 10, 2022
        </Text>
      </Box>
      <Stack ref={whyVeerge} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="26px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          {`WHY VEERGE?`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Veerge is undoubtedly the optimal choice for any property development company at this
          time, as it stands unrivaled by any alternative solution. Existing alternatives are not
          specifically tailored for real estate businesses, and when compared, Veerge consistently
          outshines them. The only viable alternative would be to assemble a team and build a
          solution from scratch or outsource the project to an IT company. However, this approach
          would involve numerous iterations and tackling challenging questions.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {` For any property development company, Veerge offers the most resourceful option. It is a
          fully developed solution that perfectly caters to your present demands, with a
          feature-rich infrastructure that surpasses the needs of any other development company. By
          choosing Veerge, you can avoid making a significant investment and gain a platform that is
          at least two years ahead of any competing company's starting point. Furthermore, we are
          committed to continuously enhancing our offerings with the promise of 'More Than You
          Consume,' as we take bold, not timid, bets.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Our measure of success revolves around the value we create for development companies in
          the long term. We firmly believe that this value directly extends and solidifies our
          market leadership position, enhancing our economic model. We gauge success based on the
          growth of development companies partnering with us, reflected in their customer and
          revenue growth, frequency of repeat purchases, and establishment of an enduring franchise.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`  Veerge is the result of a talented, smart, and hard-working team. We have high standards
          in our hiring process, and we acknowledge that working here isn't easy. Nonetheless, we
          are passionately building something of great importance to our customers, worth sharing
          with future generations. We are fortunate to have dedicated employees whose sacrifices and
          passion contribute to the success of Veerge.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Our expertise spans across real estate, finance, and technology, but we remain humble,
          knowing there is always more to learn. We maintain a constant sense of urgency and
          vigilance in all our endeavors. At Veerge, our model centers around offering low prices
          and fast delivery, and we are confident that these aspects will remain stable over time.
          We believe customers will continue to prioritize these qualities over the next decade,
          making it our objective to earn trust rather than optimize short-term profit. We believe
          that delivering consistent value will yield greater profits in the long run.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {` We operate at the forefront of technology, leveraging cutting-edge techniques such as
          random forests, naïve Bayesian estimators, RESTful services, gossip protocols, eventual
          consistency, data sharding (Yes! sharding) , anti-entropy, Byzantine quorum, erasure
          coding, vector clocks, and more. Our architects and engineers push the boundaries of
          computer science research, often pioneering new approaches to tackle novel challenges. We
          are constantly innovating, and you may witness the launch of our smart payment plan, which
          has the potential to become the new buzzword in the real estate space due to its ability
          to accelerate cash flow and incentivize all parties involved. Veerge's technology is
          implemented primarily as services, encapsulating data and offering hardened interfaces to
          access functionality.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {` This service-oriented architecture (SOA) enables services to evolve independently,
          reducing side effects and fostering seamless integration within our technology. Veerge's
          technology comprises nearly 100 software services that work in harmony to provide
          functionalities like recommendations, fulfilment, and inventory tracking. For example,
          constructing a personalized detail page for a user on Matador seamlessly interacts with
          200 to 300 services, resulting in a highly tailored experience for the customer.We do not
          sell software; rather, we embark on a collaborative journey with your company to navigate
          the future of technology. Currently, we have an all-star team, and it would be an absolute
          pleasure to serve you.`}
        </Text>
      </Stack>
      <Stack ref={ourMission} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="26px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          {`OUR MISSION`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Our mission is to democratize real estate for all, driving our actions every day. We
          create services that are inclusive and accessible to everyone. Striking a delicate balance
          between profitability and social consciousness is our commitment.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          By making real estate accessible to a wider audience, we aim to break down barriers and
          empower individuals from all walks of life to participate in this important sector. We
          believe that everyone should have the opportunity to benefit from the advantages and
          potential wealth that real estate can offer.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`In line with our mission, we are dedicated to developing services that cater to the
          diverse needs of our users. Whether it's simplifying the investment process, providing
          educational resources, or fostering transparency and trust, our goal is to ensure that our
          services are available and beneficial to everyone.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          While we are driven by the pursuit of profitability, we firmly believe that businesses
          should also be socially conscious. Our commitment to social responsibility motivates us to
          consider the broader impact of our actions. We strive to create positive change and
          contribute to the betterment of society while maintaining financial sustainability.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          By aligning profitability with social consciousness, we aim to demonstrate that business
          success and societal well-being are not mutually exclusive. Our dedication to this balance
          is at the core of our values, guiding our decisions and actions as we work towards our
          mission of democratizing real estate for all.
        </Text>
      </Stack>
      <Stack ref={ourValues} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="26px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          {`OUR VALUES`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          These are the most important values in achieving our mission and vision:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600">
          1. Safety First:
        </Text>
        <Stack as="ol" w="621px" pl="5px">
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
            mt={-3}
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              The reliability of our platform takes precedence over all else, so that we can be
              there for our customers when they need us the most.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {`We relentlessly protect our customers' security and privacy, and we only share with
              our counterparties what they need to fulfill our customers' financial needs, nothing
              more.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We build safeguards and provide education so that our customers are in the best
              position to succeed.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {`  We have high-quality, timely customer support, and when things aren't right, we fix
              them.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We work closely with regulators and lawmakers to protect our customers and the broader
              system.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {` We speak simply, plainly, and truthfully, even if it's not what others want to hear.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>We hold ourselves and our colleagues to the highest ethical standards.</span>
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
            2. Participation is Power:
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {`We aim to give everyone access to the real estate system, regardless of their
              background or bank account balance. That's why we have a product that was designed
              from the ground up for small accounts.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We reflect the world around us and we elevate and embrace all voices. We foster an
              environment where everyone feels included and empowered.
            </span>
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
            3. Radical Customer Focus:
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We exist to make our customers happy. From the early days, we have prioritized getting
              direct customer feedback on what we were building. Talking to our customers forms the
              kernel of the product development process we have today.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We listen with empathy, ask questions, and critically evaluate our work by how
              valuable our customers find it.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {`We never stop asking how we can make our product better, and we never settle for "good enough."`}
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We listen to our colleagues, and we start from a place of believing they are capable
              and well-intentioned.
            </span>
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
            4. First Principles Thinking:
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We make bold bets and challenge the status quo. Our foundation is in art, science, and
              pure mathematics, and we have a deep appreciation for the scientific process.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We develop hypotheses and design experiments to test them. We reduce complex problems
              to their constituent bits.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              We debate vigorously and change our minds when confronted with the right evidence.
            </span>
          </Text>
          <Text
            display={'flex'}
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>
              <BsDot style={{fontSize: '26px'}} />
            </span>{' '}
            <span>
              {`We bravely do what's right, even when it's scary and hasn't been done before. We treat
              our company like a product and aim to get better every single day.`}
            </span>
          </Text>
        </Stack>
      </Stack>
      <Stack ref={ourCulture} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="26px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          {`OUR CULTURE`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          We believe that any success at Myxellia comes from two things: our people and our culture.
          We believe that brilliant people operating in a great culture will produce the best
          outcome.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
          1. Never Settle:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          {`  We constantly push, rethink, and rework to get 10x further from where we are now. We
          aren't afraid to be ambitious, and we're always looking for the next big thing.`}
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Shoot for the moon: </b> Relentlessly push to become number one. Look for ways to
            disrupt, scale, and reinvent. Come up with ideas that are new, better, and unique. Be
            creative - iterate, simplify, move beyond the traditional way. Connect the dots from
            different areas, industries, and products. Vigorously set ambitious, bold, and rational
            goals to guide your way.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Push the envelope: </b>{' '}
            {`Constantly change your lens. Challenge solutions from all
            angles to deliver the best. Run toward critique to advance it even further. Recognize
            and celebrate those who challenge the status quo for the better. Pull at every thread.
            Don't just meet the ask; go above and beyond when solving a problem and never leave
            loose ends.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Jump in with both feet: </b>{' '}
            {`Enjoy the challenge, celebrate achievements, and have
            fun. Show initiative, inspire others. Enjoy taking on stretch assignments even if
            they're outside of your core responsibilities. Share optimism and confidence. Remain
            positive and energized when facing adversity.`}
          </span>
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
          2. Dream Team:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          We believe the key to winning is building diverse, lean teams of brilliant go-getters who
          break down barriers.
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Elite athletes only: </b>{' '}
            {`We don't settle for players who are just good. We are like
            a professional sports team. We hire, develop, retain elite athletes and place them in
            the right spots to win. We always choose to be a smaller team of brilliant people rather
            than a larger team with some average players in it.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Ship, shipmates, self: </b> Work together -{' '}
            {`it's the only way the company can move
            forward. Forge a shared vision. Support each other individually and professionally,
            across teams and departments. Even if it's not in your KPIs or goals. Be inclusive,
            approachable, and interested in your colleagues' work, especially if they need your help
            or expertise.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Be radically honest, direct, and respectful: </b> Feedback should be necessary,
            clear, direct, and professional. Always say what needs to be said. Build on the feedback
            you receive. Step up, speak up, encourage others to do the same. Be respectful at all
            times. Find the best tone of voice, time, and situation to provide feedback.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Never compromise on talent: </b> Make hiring decisions thoughtfully. Take the time to
            find the perfect fit. The quality and diversity of our talent define our successes.
            Provide mentoring, coaching, opportunities, and support to help your team thrive. Award
            the best. Act on underperformance promptly. Monitor it, sort it, and remedy it.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Lead by doing: </b>{' '}
            {`Roll up your sleeves and get into the weeds of the work. Get to
            know the nitty-gritty, ins-and-outs of your team to help guide everyone to success.
            Enable others to achieve their goals - celebrate when they've done well and give credit
            where credit is due. Accept responsibility when things go wrong. Work quickly to make
            things right.`}
          </span>
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
          3. Think Deeper:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          {`We believe logic, reason, and common sense prevail over everything else in
          decision-making. We dive deep until we get to atoms. If we don't know something, we bet,
          collect the data, and reiterate.`}
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>{`Start with "WHY?": `}</b> {`Think before executing - articulate your problem, probe into
            it. Is it a real problem? Challenge others to do the same. Seek data to support
            decision-making. If data is not available, be transparent that you're making an
            instinctual recommendation. Dive deep into the root cause. Solve from the first
            principles. Question experience, data, and assumptions. Always ask, "Is that true?" and
            "Why?". Constantly challenge your analysis, sense-check, look from every angle, and be
            prepared to revisit the proposed solution or initial problem.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>{`Never lose 'North':`} </b> {`Always think beyond the task at hand, keeping the bigger
            picture in mind. Think several steps ahead. (e.g., Will our solution create more
            problems? What will the next problem be once we solve this one?). Look for ways to
            create scalable frameworks and tools to increase the impact. Avoid 'analysis paralysis'
            so that we move toward solutions. Focus on the outcome and continue checking your
            compass along the way (i.e., Are we still going in the right direction?). If not, take
            courage to start from scratch.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Be open-minded - listen, probe, adjust: </b> {`Invite criticism and alternative views
            to tackle problems better. Constantly challenge assumptions in your thinking. Do not
            follow any previously agreed-upon approach blindly. Take turns speaking and listening.
            Consider all feedback regardless of the person's title. There is no place for politics
            in Myxellia. Think through your recommendation, don't say "yes" or "no" too quickly.`}
          </span>
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
          4. Get it Done:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          {`We believe that ideas are great, but execution is everything. That's why respect at
          Myxellia comes from sweat and stretch.`}
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Commit and execute: </b> Bring a can-do attitude at all times. Keep calm when facing
            challenging work. Unblock roadblocks. Break walls. Persevere until the project is
            finished. Completion is a must. And then iterate. Deliver on commitments, instill trust
            in your go-getter attitude.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Act like an owner: </b>{` Own your work and the tasks required end-to-end. Look for
            answers and solutions, not excuses. Assume full responsibility and accountability beyond
            your role or over expectations. Don't wait for guidance, self-direct. It is never
            "someone else's job or problem."`}
          </span>
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600" mt="15px">
          5. Deliver Wow:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
         {` We believe that everything we do should solve our customers' needs. To create awe and
          inspire, we pay attention to every single detail.`}
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Put customers first: </b> {`Put yourself in the shoes of the customer (external or
            internal) and understand how they are using the product or process, be curious. Focus on
            and think through every single detail. Don't ship anything unless it's ready,
            fully-baked, tested, and reviewed.`}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            <b>Keep it simple: </b> Simplify everything - minimize any friction for the customer.
            Save time for your customers, your manager, and your stakeholders. Make decisions on
            what to build and what to kill. Use language everyone can easily understand. Extract the
            essence. Lead with the most important information. Bottom line up front.
          </span>
        </Text>
      </Stack>
      <Link href="/veerge_plus/letter_from_ceo">
        <Text color="#4545FE" fontSize="16px" fontStyle="normal" fontWeight="400" mt="15px">
          Read a Letter from our CEO
        </Text>
      </Link>
    </Stack>
  );
};

export default WhyVeergeMainContent;