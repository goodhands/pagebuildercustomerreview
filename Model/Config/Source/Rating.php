<?php
namespace Vapeuk\PageBuilderCustomerReview\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

class Rating implements OptionSourceInterface
{
    /**
     * Return array of rating options
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            ['value' => 1, 'label' => __('1 Star')],
            ['value' => 2, 'label' => __('2 Stars')],
            ['value' => 3, 'label' => __('3 Stars')],
            ['value' => 4, 'label' => __('4 Stars')],
            ['value' => 5, 'label' => __('5 Stars')]
        ];
    }
}
