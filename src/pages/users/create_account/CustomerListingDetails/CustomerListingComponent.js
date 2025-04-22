import {Button, Divider, HStack, Radio, RadioGroup, SimpleGrid} from '@chakra-ui/react';
import React from 'react';
import {CustomSelect} from '../../../../ui-lib';
import ListingInfo from './CustomerListingDetails.ListingInfo';
import CustomerPreviousPaymentPlan from './CustomerListingDetails.PaymentPlan';
import UpcomingPayments from './CustomerListingDetails.UpcomingPaymentPlan';
import OutrightPayment from './OutrightPayment';

export const CustomerListingComponent = ({
  setSelectedListingName,
  selectedListingName,
  listingInfo,
  listingBundles,
  selectedListing,
  selectedUnit,
  setPaymentType,
  paymentType,
  outrightPayment,
  setOutrightPayment,
  upcomingPayment,
  setUpcomingPayment,
  pastPayment,
  setPastPayment,
  index,
  setSelectedUnitName,
}) => {
  return (
    <div index={index}>
      <SimpleGrid columns={2} w="full" spacing={6}>
        <CustomSelect
          as="select"
          id="listings"
          name="listings"
          placeholder="Pick a Listing"
          onChange={e => setSelectedListingName(e.target.value)}
          value={selectedListingName}
        >
          {!listingInfo && <p>{`Coudln't fetch amenities`}</p>}
          {listingInfo &&
            listingInfo.map((listing, index) => (
              <option key={index} value={listing.name}>
                {listing.name}
              </option>
            ))}
        </CustomSelect>
        <CustomSelect
          as="select"
          id="units"
          name="units"
          placeholder="Pick a Unit"
          onChange={e => setSelectedUnitName(e.target.value)}
        >
          {listingBundles &&
            listingBundles.map((unit, index) => (
              <option key={index} value={unit.unit_title}>
                {unit.unit_title}
              </option>
            ))}
        </CustomSelect>
      </SimpleGrid>

      <ListingInfo listing={selectedListing} units={selectedUnit} />
      <Divider color="#E4E4E4" my="50px" w="full" orientation="horizontal" />
      {/* Choose payment type */}
      <RadioGroup onChange={setPaymentType} value={paymentType}>
        <HStack spacing="30px" colorScheme="gray" align="center">
          <Button maxW="139px" borderRadius="28px" variant="contained">
            <Radio
              mr={2}
              color={themeStyles.color.primary}
              borderColor={themeStyles.color.primary}
              value="outright"
            />{' '}
            Outright payment
          </Button>
          <Button maxW="139px" borderRadius="28px" variant="contained">
            <Radio
              mr={2}
              color={themeStyles.color.primary}
              borderColor={themeStyles.color.primary}
              value="custom"
            />{' '}
            Custom payment
          </Button>
        </HStack>
      </RadioGroup>

      {paymentType === 'outright' ? (
        <OutrightPayment
          // field={field}
          outrightPayment={outrightPayment}
          setOutrightPayment={setOutrightPayment}
        />
      ) : (
        <div>
          <CustomerPreviousPaymentPlan
            // field={field.bundle}
            paymentPlan={pastPayment}
            setPaymentPlan={setPastPayment}
          />
          <UpcomingPayments
            // field={field.bundle}
            upcomingPayment={upcomingPayment}
            setUpcomingPayment={setUpcomingPayment}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerListingComponent;
