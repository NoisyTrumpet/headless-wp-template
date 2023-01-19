import { MenuItem } from "graphql";

export const menuItems = [
  {
    __typename: "MenuItem",
    id: "cG9zdDo2OQ==",
    path: "/about/",
    label: "About",
    parentId: null,
    cssClasses: [],
    menu: {
      __typename: "MenuItemToMenuConnectionEdge",
      node: {
        __typename: "Menu",
        name: "Primary",
      },
    },
  },
  {
    __typename: "MenuItem",
    id: "cG9zdDo3MA==",
    path: "/partners/",
    label: "Partners",
    parentId: null,
    cssClasses: [],
    menu: {
      __typename: "MenuItemToMenuConnectionEdge",
      node: { __typename: "Menu", name: "Primary" },
    },
  },
  {
    __typename: "MenuItem",
    id: "cG9zdDo2OA==",
    path: "/contact/",
    label: "Contact",
    parentId: null,
    cssClasses: [],
    menu: {
      __typename: "MenuItemToMenuConnectionEdge",
      node: { __typename: "Menu", name: "Primary" },
    },
  },
];

export const socialLinks = [
  {
    __typename: "SiteSettings_Sitesettings_socialLinks",
    link: "https://www.instagram.com/puppyfoodbank/",
    platform: "inst",
  },
  {
    __typename: "SiteSettings_Sitesettings_socialLinks",
    link: "https://www.facebook.com/PuppyFoodBank",
    platform: "fb",
  },
  {
    __typename: "SiteSettings_Sitesettings_socialLinks",
    link: "https://www.youtube.com/@puppyfoodbank",
    platform: "yt",
  },
];

export const address = {
  __typename: "ACF_GoogleMap",
  placeId: "ChIJQaitZjtfXIYRAj0hs7WzV6g",
  postCode: "78229",
  state: "Texas",
  streetAddress: "7550 IH-10 West, San Antonio, TX 78229",
  city: "San Antonio",
  streetName: "Interstate 10",
  stateShort: "TX",
  streetNumber: "7550",
};

export const monthly = {
  __typename: "SiteSettings_Sitesettings_Monthly",
  links: [
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$11 Monthly",
        url: "https://buy.stripe.com/eVa9Brfqc5yi7wQ3cg",
      },
      priceId: "price_1MHwhTABQlVea4U81kxfFSrH",
      price: 11,
    },
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$19 Monthly",
        url: "https://buy.stripe.com/28o6pfb9W8KueZi3ci",
      },
      priceId: "price_1MHwhvABQlVea4U8BGRdJeBX",
      price: 19,
    },
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$25 Monthly",
        url: "https://buy.stripe.com/aEU8xn6TG6Cm5oI28d",
      },
      priceId: "price_1MHwicABQlVea4U8JnFGuPzV",
      price: 25,
    },
  ],
};

export const oneTime = {
  __typename: "SiteSettings_Sitesettings_Monthly",
  links: [
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$11 Monthly",
        url: "https://buy.stripe.com/eVa9Brfqc5yi7wQ3cg",
      },
      priceId: "price_1MHwhTABQlVea4U81kxfFSrH",
      price: 11,
    },
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$19 Monthly",
        url: "https://buy.stripe.com/28o6pfb9W8KueZi3ci",
      },
      priceId: "price_1MHwhvABQlVea4U8BGRdJeBX",
      price: 19,
    },
    {
      __typename: "SiteSettings_Sitesettings_Monthly_links",
      link: {
        __typename: "AcfLink",
        target: "",
        title: "$25 Monthly",
        url: "https://buy.stripe.com/aEU8xn6TG6Cm5oI28d",
      },
      priceId: "price_1MHwicABQlVea4U8JnFGuPzV",
      price: 25,
    },
  ],
};

export const toteBagImage = {
  __typename: "MediaItem",
  sourceUrl:
    "https://cms.puppyfoodbank.org/wp-content/uploads/2023/01/tote-bag-small-jpg.webp",
  altText: "Tote Bag Image",
  caption: null,
  description: null,
  srcSet:
    "https://cms.puppyfoodbank.org/wp-content/uploads/2023/01/tote-bag-small-jpg.webp 300w, https://cms.puppyfoodbank.org/wp-content/uploads/2023/01/tote-bag-small-150x150.webp 150w",
  sizes: "(max-width: 300px) 100vw, 300px",
  id: "cG9zdDoxODI=",
  mediaDetails: { __typename: "MediaDetails", width: 300, height: 300 },
  mimeType: "image/jpeg",
};

export const phoneNumber = {
  __typename: "AcfLink",
  target: "_blank",
  title: "210-572-7571",
  url: "tel:210.572.7571",
};
