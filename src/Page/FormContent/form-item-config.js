export const formUploadItem = [
  {
    label: "header_logo.svg",
    name: "header_logo",
    type: 'image/svg+xml',
    typeUrl: 'svg',
    require: false,
    fieldName: "logo",
    action: "upload"
  },
  {
    label: "banner_desktop.png",
    name: "banner_desktop",
    type: 'image/png',
    typeUrl: 'png',
    require: false,
    fieldName: "image",
    action: "upload"
  },
  {
    label: "banner_mobile.png",
    name: "banner_mobile",
    type: 'image/png',
    typeUrl: 'png',
    require: false,
    fieldName: "image",
    action: "upload"
  },
  {
    label: "slide.png",
    name: "slide",
    type: 'image/png',
    typeUrl: 'png',
    require: false,
    fieldName: "image",
    action: "upload"
  },
  {
    label: "logo_header_white.svg",
    name: "logo_header_white",
    type: 'image/svg+xml',
    typeUrl: 'svg',
    require: false,
    fieldName: "logo",
    action: "upload"
  },
  {
    label: "footer_logo.svg",
    name: "footer_logo",
    type: 'image/svg+xml',
    typeUrl: 'svg',
    require: false,
    fieldName: "logo",
    action: "upload"
  },
  {
    label: "payment_bill.png",
    name: "payment_bill",
    type: 'image/png',
    typeUrl: 'png',
    require: false,
    fieldName: "image",
    action: "upload"
  },
  {
    label: "bien_lai.png",
    name: "bien_lai",
    type: 'image/png',
    typeUrl: 'png',
    require: false,
    fieldName: "image",
    action: "upload"
  },
  {
    label: "content.json",
    name: "content",
    type: 'application/json',
    typeUrl: 'json',
    require: false,
    fieldName: "content",
    action: "upload"
  }
]


export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
export const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 2,
  },
};

export const uploadLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
export const uploadTailLayout = {
  wrapperCol: {
    offset: 1,
    span: 6,
  },
};


