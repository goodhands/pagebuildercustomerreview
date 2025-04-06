<?php
namespace Vapeuk\PageBuilderCustomerReview\Block\Widget;

use Magento\Framework\View\Element\Template;
use Magento\Widget\Block\BlockInterface;

class ReviewContent extends Template implements BlockInterface
{
    /**
     * @const WIDGET_TEMPLATE The template to use for the widget
     */
    public const WIDGET_TEMPLATE = "widget/review_content/default.phtml";

    /**
     * @var string The template to use for the widget
     */
    protected $_template = self::WIDGET_TEMPLATE;

    /**
     * Get customer name
     *
     * @return string|null
     */
    public function getCustomerName(): ?string
    {
        return $this->getData('customer_name');
    }

    /**
     * Get customer rating
     *
     * @return int|null
     */
    public function getRating(): ?int
    {
        return (int) $this->getData('rating');
    }

    /**
     * Get review text
     *
     * @return string|null
     */
    public function getReviewTitle(): ?string
    {
        return $this->getData('review_title');
    }

    /**
     * Get customer location
     *
     * @return string|null
     */
    public function getCustomerReview(): ?string
    {
        return $this->getData('customer_review');
    }

    /**
     * Get customer location
     *
     * @return string|null
     */
    public function getCustomerCountry(): ?string
    {
        return $this->getData('customer_country');
    }

    public function getFlagUrl(): ?string
    {
        $country = $this->getCustomerCountry();

        if ($country) {
            return 'https://flagcdn.com/w40/'.strtolower($country).'.png';
        }

        return null;
    }
}
