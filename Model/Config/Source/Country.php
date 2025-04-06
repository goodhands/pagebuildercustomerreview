<?php
namespace Vapeuk\PageBuilderCustomerReview\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;
use Magento\Directory\Model\ResourceModel\Country\CollectionFactory as CountryCollectionFactory;

class Country implements OptionSourceInterface
{
    public function __construct(
        protected CountryCollectionFactory $countryCollectionFactory
    ) {}

    /**
     * Return array of rating options
     *
     * @return array
     */
    public function toOptionArray()
    {
        return $this->countryCollectionFactory->create()
                        ->addFieldToSelect('country_id')
                        ->addFieldToSelect('iso3_code')
                        ->setOrder('iso3_code', 'ASC')
                        ->toOptionArray();
    }
}
