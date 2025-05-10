// Component database with prices
export const componentDatabase = {
  'Windows Activation': [
    { name: 'Windows Genuine License Activation', hsn: '9931', price: 423.73, gst: 18 },
    { name: 'Windows 11 Pro Activation', hsn: '9931', price: 500.00, gst: 18 },
  ],
  'Office Licenses': [
    { name: 'MS Office License', hsn: '9931', price: 423.73, gst: 18 },
    { name: 'MS Office 365 Personal', hsn: '9931', price: 4999.00, gst: 18 },
    { name: 'MS Office 2021 Professional', hsn: '9931', price: 29999.00, gst: 18 },
  ],
  'Power Supplies': [
    { name: 'Artis PS-600VA 600VA Line Interactive', hsn: '8473', price: 2000.00, gst: 18 },
    { name: 'DeepCool PL650D ATX 3.0 650 Watt 80 Plus Bronze SMPS', hsn: '8473', price: 4080.00, gst: 18 },
    { name: 'Corsair CV550 550W 80+ Bronze PSU', hsn: '8473', price: 3500.00, gst: 18 },
    { name: 'Antec Atom V650 650W 80+ Gold', hsn: '8473', price: 5500.00, gst: 18 },
  ],
  'Accessories': [
    { name: 'HP KM160 Wired Mouse and Keyboard Combo', hsn: '8504', price: 800.00, gst: 18 },
    { name: 'Logitech MK240 Wireless Combo', hsn: '8504', price: 1500.00, gst: 18 },
    { name: 'Dell WM126 Wireless Mouse', hsn: '8504', price: 699.00, gst: 18 },
    { name: 'Zebronics Zeb-K16 Wired Keyboard', hsn: '8504', price: 399.00, gst: 18 },
  ],
  'Monitors': [
    { name: 'ZEBRONICS Z-E19HD ZEBSTAR LED Monitor', hsn: '8473', price: 2100.00, gst: 18 },
    { name: 'LG 22MK430H-B 22 inch LED Monitor', hsn: '8473', price: 6999.00, gst: 18 },
    { name: 'Dell E2220H 21.5 inch Monitor', hsn: '8473', price: 7500.00, gst: 18 },
    { name: 'HP M22f 21.5 inch FHD Monitor', hsn: '8473', price: 8999.00, gst: 18 },
  ],
  'Web Cameras': [
    { name: 'Zebronics Zeb-Crystal Pro Web Camera', hsn: '8473', price: 590.00, gst: 18 },
    { name: 'Logitech C270 HD Webcam', hsn: '8473', price: 1499.00, gst: 18 },
    { name: 'HP W200 Webcam', hsn: '8473', price: 999.00, gst: 18 },
  ],
  'Air Coolers': [
    { name: 'Deepcool AK400 Black CPU Air Cooler', hsn: '8473', price: 2050.00, gst: 18 },
    { name: 'Arctic Freezer 34 CPU Cooler', hsn: '8473', price: 2999.00, gst: 18 },
    { name: 'Noctua NH-L9i CPU Cooler', hsn: '8473', price: 4499.00, gst: 18 },
  ],
  'Graphics Cards': [
    { name: 'MSI RTX 3050 Ventus 2X XS OC 8GB', hsn: '8504', price: 19830.00, gst: 18 },
    { name: 'Gigabyte GTX 1650 4GB OC', hsn: '8504', price: 14999.00, gst: 18 },
    { name: 'AMD RX 6600 XT 8GB', hsn: '8504', price: 29999.00, gst: 18 },
  ],
  'Cabinets': [
    { name: 'Ant Esports Zen Wood C3 (ATX) Mid Tower Cabinet', hsn: '8504', price: 3900.00, gst: 18 },
    { name: 'Deepcool MATREXX 40 Micro-ATX Case', hsn: '8504', price: 2199.00, gst: 18 },
    { name: 'Corsair SPEC-DELTA RGB Case', hsn: '8504', price: 5999.00, gst: 18 },
  ],
  'RAM': [
    { name: 'G.Skill Ripjaws S5 16GB DDR5 5200MHz', hsn: '8504', price: 3220.00, gst: 18 },
    { name: 'Crucial 16GB DDR4 3200MHz', hsn: '8504', price: 2999.00, gst: 18 },
    { name: 'Kingston Fury Beast 32GB DDR5 5600MHz', hsn: '8504', price: 6999.00, gst: 18 },
  ],
  'Motherboards': [
    { name: 'Gigabyte B760M G AX (Wi-Fi) DDR5', hsn: '8504', price: 10000.00, gst: 18 },
    { name: 'ASUS PRIME B550M-A', hsn: '8504', price: 8499.00, gst: 18 },
    { name: 'MSI B550 TOMAHAWK', hsn: '8504', price: 12999.00, gst: 18 },
  ],
  'Processors': [
    { name: 'Intel Core i7-12700K', hsn: '8473', price: 19490.00, gst: 18 },
    { name: 'AMD Ryzen 7 5800X', hsn: '8473', price: 18999.00, gst: 18 },
    { name: 'Intel Core i5-12600K', hsn: '8473', price: 14999.00, gst: 18 },
  ],
  'Storage': [
    { name: 'WD Blue SN5000 NVMe SSD 500GB', hsn: '8473', price: 2700.00, gst: 18 },
    { name: 'Samsung 980 1TB NVMe SSD', hsn: '8473', price: 7499.00, gst: 18 },
    { name: 'Seagate BarraCuda 1TB HDD', hsn: '8473', price: 2899.00, gst: 18 },
  ],
};

// Icon mapping for categories
export const categoryIcons = {
  'Windows Activation': 'Monitor',
  'Office Licenses': 'Grid',
  'Power Supplies': 'Zap',
  'Accessories': 'Keyboard',
  'Monitors': 'Monitor',
  'Web Cameras': 'Camera',
  'Air Coolers': 'Fan',
  'Graphics Cards': 'Cpu',
  'Cabinets': 'Package',
  'RAM': 'Cpu',
  'Motherboards': 'Cpu',
  'Processors': 'Cpu',
  'Storage': 'Database'
};