//index.jsx
export const genericAPIStructure = {
	result: null,
	fetching: false,
	fetched: false
}

export const USER_TYPE = {
	broker:'broker',
	client:'client',
	admin:'admin',
}

export const UTIL = {
	dateFormat:"YYYY-MM-DD",
	frontDateFormat:"DD-MM-YYYY",
	dateAndTimeFormat: "DD-MM-YYYY  hh:mm A",
	showMonthAndYearOnly : "MM-YYYY",
	showDayAndMonthOnly : "DD-MM",
	dateMonthAndTime: "DD-MM  hh:mm A",
	dateTimeSecFormate : "DD-MM-YYYY  hh:mm:ss A",
  fullTimeIn24hours:"HH:mm:ss",
  fullTimeIn12hours:"hh:mm:ss",
}

export const FEATURE_PERMISSIONS = ['add','view','delete','export']

export const otpLength = 6

export const TRANSACTION_DELETE_MSG = ["This will delete all the information related to this Asset. Are you sure ?"]

export const CLIENT_INFO_ONE = [
    { label: 'PAN', value: 'pan' , defaultIndex: 0},
    { label: 'Landline no', value: 'landline', defaultIndex: 0},
    { label: 'Address', value: ['address1', 'address2', 'address3', 'city', 'pin'] , defaultIndex: 0 },
    { label: 'Date of Birth', value: 'dob', dateFormatter: true, defaultIndex: 0},
    { label: 'Anniversary Date', value: 'anniversary', dateFormatter: true, defaultIndex: 0},
  ]

export const CLIENT_INFO_TWO = [
    { label: 'AUM', value: 'aum', valueFormatter: true ,defaultIndex: 1 },
    { label: 'Family AUM', value: 'familyAum', valueFormatter: true, defaultIndex: 1 },
    { label: 'Last Portfolio Review', value: 'lastReviewDate', dateFormatter: true , defaultIndex: 0 },
    { label: 'Goal Amount', value: 'goalAmount', valueFormatter: true, defaultIndex: 1 },
    { label: 'Current SIPs', value: 'sip', valueFormatter: true, defaultIndex: 1 },
    { label: 'Current STPs', value: 'stp', valueFormatter: true, defaultIndex: 1 },
    { label: 'Current SWPs', value: 'swp', valueFormatter: true, defaultIndex: 1 },
    { label: 'Last Purchase', value: 'lastPurchaseDate', dateFormatter: true, defaultIndex: 0 },
    { label: 'Created Date', value: 'createdAt', dateFormatter: true, defaultIndex: 0 },
  ]

export const MOBILE_OS_PLATFORM = [
  { levelName: 'Android', levelNo: 'ANDROID', fileSize: '50', fileFormat: 'json' },
  { levelName: 'IOS', levelNo: 'IOS', fileSize: '50', fileFormat: 'txt' }
]
export const DOCS_LOCATION_DOMAIN = 'https://docs.investwellonline.com'
export const INVESTWELL_CLOUD_IMAGES = 'cloud_investwell_images'
export const INVESTWELL_LOGOS = 'logo'
export const INVESTWELL_TEMPLATE_IMAGES= 'TemplateImages'
export const INVESTWELL_LARGE_LOGOS= 'Large'
export const INVESTWELL_SMALL_LOGOS= 'Small'
export const INVESTWELL_CUSTOM_IMAGES= 'CustomImages'
export const INVESTWELL_FUNDS_IMAGES= 'Funds'
export const INVESTWELL_MEETING_NOTES_IMAGE = 'MeetingNotes'
export const CHECK_FOR_MAINTAINANCE = [503, 502, 504, 404]


//shared/commonConst
export const TXN_TYPE_FILTER_PURCHASE = [
	{label:'Purchase', value:'NRP',type:'purchase'},
	{label:'SIP', value:'SIP',type:'purchase'},
	{label:'STI', value:'STI',type:'purchase'},
	{label:'Switch In', value:'SWI',type:'purchase'},
	{label:'Dividend Reinvest', value:'DIR',type:'purchase'},
	{label:'Bonus', value:'BON',type:'purchase'}
]

export const TXN_TYPE_FILTER_SELL = [
	{label: 'Sell', value: 'NRS',type:'sell'},
	{label: 'STO', value: 'STO',type:'sell'},
	{label: 'Switch Out', value: 'SWO',type:'sell'},
	{label: 'SWP', value: 'SWP',type:'sell'},
	{label: 'Div Payout', value: 'DVP',type:'sell'}
]
export const TXN_TYPE_FILTER_PAYOUT = [
	{label: 'Div Payout', value: 'DVP'}
]

export const SUB_USER_SELECT = {
'Client':
	{label:"name",value:'name'},
'RM':
	{label:"name",value:'name'},
'Sub Broker':
	{label:"name",value:'name'}
}
export const VALID_FILE_MEETING_NOTES = ['jpg', 'jpeg', 'pdf', 'png']

export const SELECT_USER = [
	{label:"Client",value:'100'},
	{label:"RM",value:'10'},
	{label:"Sub Broker",value:'11'}
]

export const SELECT_USER_CLIENT = [
	{label:"Client",value:'100'}
]

export const COUNTRY_LIST = [
	{label:"INDIA",value:'India'}
]

export const INDIAN_STATES = [
	{label:"Andaman and Nicobar Islands",value:'Andaman and Nicobar Islands'},
	{label:"Andhra Pradesh",value:'Andhra Pradesh'},
	{label:"Arunachal Pradesh",value:'Arunachal Pradesh'},
	{label:"Assam",value:'Assam'},
	{label:"AssamBihar",value:'Bihar'},
	{label:"Chandigarh",value:'Chandigarh'},
	{label:"Chhattisgarh",value:'Chhattisgarh'},
	{label:"Dadra and Nagar Haveli",value:'Dadra and Nagar Haveli'},
	{label:"Daman and Diu",value:'Daman and Diu'},
	{label:"Delhi",value:'Delhi'},
	{label:"Goa",value:'Goa'},
	{label:"Gujarat",value:'Gujarat'},
	{label:"Haryana",value:'Haryana'},
	{label:"Himachal Pradesh",value:'Himachal Pradesh'},
	{label:"Jammu and Kashmir",value:'Jammu and Kashmir'},
	{label:"Jharkhand",value:'Jharkhand'},
	{label:"Karnataka",value:'Karnataka'},
	{label:"Kerala",value:'Kerala'},
	{label:"Lakshadweep",value:'Lakshadweep'},
	{label:"Madhya Pradesh",value:'Madhya Pradesh'},
	{label:"Maharashtra",value:'Maharashtra'},
	{label:"Manipur",value:'Manipur'},
	{label:"Meghalaya",value:'Meghalaya'},
	{label:"Mizoram",value:'Mizoram'},
	{label:"Nagaland",value:'Nagaland'},
	{label:"Odisha",value:'Odisha'},
	{label:"Puducherry",value:'Puducherry'},
	{label:"Punjab",value:'Punjab'},
	{label:"Rajasthan",value:'Rajasthan'},
	{label:"Sikkim",value:'Sikkim'},
	{label:"Tamil Nadu",value:'Tamil Nadu'},
	{label:"Telangana",value:'Telangana'},
	{label:"Tripura",value:'Tripura'},
	{label:"Uttar Pradesh",value:'Uttar Pradesh'},
	{label:"Uttarakhand",value:'Uttarakhand'},
	{label:"West Bengal",value:'West Bengal'}
]

export const MODE_LIST = [
	{label:'Physical', value :1 },
	{label:'Digital', value :1 }
]
export const MODE_LIST_JOINT = [
	{label:'Physical', value :1 }
]

export const DIGITAL_AC_TYPE =[
	{accType:'CA', description:'Current Account'},
	{accType:'SB', description:'Savings Account'}
]

export const PAGE_SIZE = [
	{label : '10', value : 10},
	{label : '20', value : 20},
	{label : '30', value : 30},
	{label : '40', value : 40},
	{label : '50', value : 50},
	{label : '60', value : 60},
	{label : '70', value : 70},
	{label : '80', value : 80},
	{label : '90', value : 90},
	{label : '100', value : 100}
]
export const PAGINATION_SIZE ={defaultSize:100}

export const KeyCode ={enter:13, esc:27, next:9}

export const MONTH_LIST =[
	{label:1, value:'1'},
	{label:2, value:'2'},
	{label:3, value:'3'},
	{label:4, value:'4'},
	{label:5, value:'5'},
	{label:6, value:'6'},
	{label:7, value:'7'},
	{label:8, value:'8'},
	{label:9, value:'9'},
	{label:10, value:'10'},
	{label:11, value:'11'},
	{label:12, value:'12'},
]

export const UPLOAD_DOCUMENT_CATEGORY = [
	{label:'PAN Card', value :'PAN' },
	{label:'Aadhar Card', value :'aadhar' },
	{label:'Transaction Slip', value :'transaction' },
	{label:'KYC', value :'KYC' },
	{label:'Photo', value :'photo' },
	{label:'Driving License', value :'DL' },
	{label:'General', value :'others' },
]


 export const CALL_LIMIT = {
  	limitNumber: 5,
 }

 export const CAPTION_MESSAGE = [
	{label : ' Tip : You could try again by selecting a different filter or date range. '},
	{label : ' Choose RTA ' },
	{label : ' We are preparing your data, Please wait...'},
	{label : ' Build a report'},
	{label : ' Use the form above to generate a report'},
	{label : ' Search for a broker and then view ARN-RTA wise brokerage ' },
	{label : ' Fetching Bank details, please wait...' }
 ]

 export const LOADER_WIDTH = [
	{ width : '10px', height : '20px'},
	{ width : '20px', height : '30px'},
	{ width : '30px', height : '40px'},
	{ width : '40px', height : '50px'},
	{ width : '50px', height : '60px'},
	{ width : '60px', height : '70px'},
	{ width : '70px', height : '80px'},
	{ width : '80px', height : '90px'},
	{ width : '90px', height : '100px'},
	{ width : '100px', height : '110px'},
 ]
 export const TRANSACTION_TABS = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund', shortLabel : 'MF'},
	{label:'Share & Bond',  value:1, type:'shareAndBond', shortLabel : 'Shares'},
	{label:'Fixed Deposit', value:2, type:'fixedDeposit', shortLabel : 'FD'},
	// {label:'Insurance', value:3, type:'insurance', shortLabel : 'Insurance'},
	{label:'Other Assets',  value:4, type:'otherAssets', shortLabel : 'Others'},
]

export const TRANSACTION_TABS_BROKER = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund'},
	{label:'Share & Bond',  value:1, type:'shareAndBond'},
	{label:'Fixed Deposit', value:2, type:'fixedDeposit'},
	{label:'Other Assets',  value:3, type:'otherAssets'},
]

export const COMPOUNDING_TYPES = [
	{label: 'Yearly Compounding', value: 'YC'},
	{label: 'Yearly Payout', value: 'YP'},

	{label: 'Half Yearly Compounding', value: 'HC'},
	{label: 'Half Yearly Payout', value: 'HP'},

	{label: 'Quarterly Compounding', value: 'QC'},
	{label: 'Quarterly Payout', value: 'QP'},

	{label: 'Monthly Compounding', value: 'MC'},
	{label: 'Monthly Payout', value: 'MP'}
]

export const TXN_TYPE_FILTER_SHARE_BOND_SELL = [
	{label: 'Sell', value: 1}
]
export const TXN_TYPE_FILTER_SHARE_BOND_PURCHASE = [
	{label: 'Purchase', value: 0},
	{label: 'Div Payout', value: 2},
	{label: 'Bonus', value: 3},
	{label: 'Interest', value: 4},
]

export const TXN_TYPE_FOR_TXN_VIEW_SHARE_BOND = [
	{label: 'Purchase', value: 0},
	{label: 'Div Payout', value: 2},
	{label: 'Bonus', value: 3},
	{label: 'Interest', value: 4},
	{label: 'Sell', value: 1},
]


export const SHARE_BOND_FORM_TITLE = [
	{label: 'Share Purchase', value: 0},
	{label: 'Share Sell', value: 1},
	{label: 'Bond Purchase', value: 2},
	{label: 'Bond Sell', value: 3}
]
export const OTHER_ASSET = [
	{label: 'REAL ESTATE', value: 'RE'},
	{label: 'GOLD', value: 'GD'},
	{label: 'PMS', value: 'PM'},
	{label: 'GENERAL', value:'GN'},
	{label: 'Insurance', value:'IN'},
	{label: 'Securities', value:'SC'},
	{label: 'PPF', value:'PP'},
	{label: 'LRS', value:'LR'},
	{label: 'AIF', value:'AI'},
	{label: 'EPF', value:'EP'},	
	{label: 'Liquiloans', value:'LL'}
]

export const ASSET_TXNS_TYPE = [
	{label: 'Sell', value:'S'},
	{label: 'Buy', value:'B'}
]

export const TXNS_TYPE = [
	{label: 'Sell', value:'SELL'},
	{label: 'Buy', value:'BUY'}
]
export const CAPITAL_GAIN_REALIZED_CATEGORY_TYPE = [
	{category: 'Short Term Debt', value:101},
	{category: 'Short Term Equity', value:102},
	{category: 'Long Term Debt', value:201},
	{category: 'Long Term Equity', value:202},
	{category: "Long Term Equity Before Jan'18", value:203},
	{category: "Long Term Equity After Jan'18", value:204},
	{category: "Speculation", value:301},
]
export const CAPITAL_GAIN_UNREALIZED_CATEGORY_TYPE = [
    {category: 'ELSS Locked', value:101},
    {category: 'ELSS UnLocked', value:102},
    {category: 'Short Term Debt', value:201},
    {category: 'Short Term Equity', value:202},
    {category: 'Long Term Debt', value:301},
    {category: 'Long Term Equity', value:302},
	{category: "ELSS Unlocked Before Jan'18", value:103},
	{category: "ELSS Unlocked After Jan'18", value:104},
	{category: "Long Term Equity Before Jan'18", value:303},
	{category: "Long Term Equity After Jan'18", value:304},
]

export const LEVEL_NUMBERS = {1:1, 2:8, 3:10, 4:96, 5:98, 6:100, 7: 1001, 8: 1002, 9:1003, 10: 1008}

export const LEVEL_NUMBERS_VALUE = {
	1: {levelNo: 1, levelName: "Broker"},
	8: {levelNo: 8, levelName: "Relationship Manager"},
	10: {levelNo: 10, levelName: "Sub Broker"},
	96: {levelNo: 96, levelName: "Family Group Head"},
	98: {levelNo: 98, levelName: "Family Head"},
	100: {levelNo: 100, levelName: "Investor"},
	1001: {levelNo: 1001, levelName: "Fund"},
	1002: {levelNo: 1002, levelName: "Scheme"},
	1003: {levelNo: 1003, levelName: "Category"},
	1004: {levelNo: 1004, levelName: "Sub Category"},
	1005: {levelNo:1005 , levelName:'Folio'},
	1006: {levelNo:1006 , levelName:'Holding'},
	1007: {levelNo:1007 , levelName:'Sector'},
	1008: {levelNo:1008 , levelName:'Registrar'},
	7: {levelNo:7 , levelName:'Operations'},
	31: {levelNo:31 , levelName:'Service RM'},
	30: {levelNo:30 , levelName:'Back Office'},
	32: {levelNo:32 , levelName:'Shadow User'},
}

export const LEVEL_NUMBERS_UPTO_SERVICERM_EXCEPT_SB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 30, 31]

export const PAGINATION_CONST = [
	{label:10,value:10},
    {label:20,value:20},
    {label:50,value:50},
    {label:100,value:100}
]
export const URL_ARRAY = [
	{url:'/api/auth/file/upload' ,value:1},
	{url:'/api/auth/file/FTPUpload',value:2}
]
export const CROPPER_TITLE = [
	{label:'First Applicant Signature Crop' ,value:1},
	{label:'Crop Your Image',value:2}
]

export const IMAIL_TABS = [
	{label:'Campaigns', value:0 ,type:'campaigns'},
	{label:'Templates', value:1, type:'templates'}
]

export const TAX_STATUS_BROKER_BSE = [
	{label:'Individual' ,value:'01'},
	{label:'On Behalf of Minor',value:'02'}
]

export const TAX_STATUS_BROKER_NSE = [
	{label:'Individual' ,value:'01'},
	{label:'On Behalf of Minor',value:'02',handleMinorCase : true},
	{label:'HUF',value:'03', companyPanValidationTrue: true},
	{label:'NRI-MINOR (NRO)' ,value:'28',handleMinorCase : true},
	{label:'NRI-MINOR' ,value:'26',handleMinorCase : true},
	{label:'NRI REPATRIABLE' ,value:'21'},
	{label:'NRI Through NRO',value:'11'},
	{label:'NRE HUF (NRE)',value:'29', companyPanValidationTrue: true},
	{label:'NRE HUF (NRO)',value:'27', companyPanValidationTrue: true},
	{label:'PIO NRI',value:'70'},
	{label:'PIO NRO',value:'76'},
]

export const CLIENT_TAX_STATUS = [
	{label:'Indian Resident Individual' ,value:'INDIAN RESIDENT INDIVIDUAL'},
	{label:'On Behalf of Minor' ,value:'ON BEHALF OF MINOR'},
	{label:'Sole Proprietorship' ,value:'SOLE PROPRIETORSHIP'},
	{label:'Company/Body Corporate' ,value:'COMPANY/BODY CORPORATE'},
	{label:'Global Development Network' ,value:'GLOBAL DEVELOPMENT NETWORK'},
	{label:'NPS Trust' ,value:   'NPS TRUST'},
	{label:'Defense Establishment' ,value:'DEFENSE ESTABLISHMENT'},
	{label:'Foreign Portfolio Investor' ,value:'FOREIGN PORTFOLIO INVESTOR'},
	{label:'Non-Government Organisation (NGO)' ,value:'NON-GOVERNMENT ORGANISATION'},
	{label:'Private Limited Company' ,value:'PRIVATE LIMITED COMPANY'},
	{label:'FOF MF Schemes' ,value:'FOF MF SCHEMES'},
	{label:'Gratuity Fund' ,value:'GRATUITY FUND'},
	{label:'Superannuation/Pension Fund' ,value:'SUPERANNUATION/PENSION FUND'},
	{label:'Providend Fund' ,value:'PROVIDEND FUND'},
	{label:'Trust/Society' ,value:'TRUST/SOCIETY'},
	{label:'AOP/BOI' ,value:'AOP/BOI'},
	{label:'Government Body' ,value:'GOVERNMENT BODY'},
	{label:'Insurance Company' ,value:'INSURANCE COMPANY'},
	{label:'Bank/FI' ,value:'BANK/FI'},
	{label:'Body Corporate' ,value:'BODY CORPORATE'},
	{label:'Unlisted Company' ,value:'UNLISTED COMPANY'},
	{label:'Limited Partnership (LLP)' ,value:'LIMITED PARTNERSHIP(LLP)'},
	{label:'Partnership Firm' ,value:'PARTNERSHIP FIRM'},
	{label:'HUF-Indian' ,value:'HUF-INDIAN'},
	{label:'NRI (Repatriable)' ,value:'NRI(REPATRIABLE)'},
	{label:'NRI (Non-Repatriable)' ,value:'NRI(NON-REPATRIABLE)'},
	{label:'On Behalf of NRI-Minor (Repatriable)' ,value:'ON BEHALF OF NRI-MINOR(REPATRIABLE)'},
	{label:'On Behalf of NRI-Minor (Non-Repatriable)' ,value:'ON BEHALF OF NRI-MINOR(NON-REPATRIABLE)'},
	{label:'HUF-NRI' ,value:'HUF-NRI'},
	{label:'Foreign Institutional Investor (FII)' ,value:'FII'},
	{label:'Listed Company' ,value:'LISTED COMPANY'},
	{label:'People of Indian Origin' ,value:'PEOPLE OF INDIAN ORIGIN'},
	{label:'Others' ,value:'OTHERS'},
]

export const CLIENT_BANK_ACCOUNT_TYPE = [
	{levelName:'Savings',levelNo:'SAVING'},
	{levelName:'Current',levelNo:'CURRENT'},
	{levelName:'Non Resident External (NRE)',levelNo:'NRE'},
	{levelName:'Non Resident Ordinary (NRO)',levelNo:'NRO'},
	{levelName:'Foreign Currency Non Resident (FCNR)',levelNo:'FCNR'},
	{levelName:'Non-resident Special Rupee (NRSR)',levelNo:'NRSR'},
	{levelName:'Cash Credit (CC)',levelNo:'CC'},
]
export const PROCESS_MODE_LIST = [
	{label:'Physical', value :'P' },
	{label:'Digital', value :'D' }
 ]
 
export const TAX_STATUS_CLIENT_BSE = [
{label:'Individual' ,value:'01'}
]
export const HOLDING_BSE = [
	{label:'Single' ,value:'SI'},
	{label:'Joint',value:'JO'},
	{label:'Anyone or Survivor',value:'AS'}
]
export const OCCUPATION_BSE = [
	{label:'Business',value:'01'},
	{label:'Services',value:'02'},
	{label:'Professional',value:'03'},
	{label:'Agriculture',value:'04'},
	{label:'Retired',value:'05'},
	{label:'Housewife',value:'06'},
	{label:'Student',value:'07'},
	{label:'Others',value:'08'}
]
export const OCCUPATION_NSE = [
	{label:'Agriculturist',value:'4'},
	{label:'Business',value:'1'},
	{label:'Business Manufacturing',value:'1A'},
	{label:'Business Trading',value:'1B'},
	{label:'Financial Institution',value:'35'},
	{label:'Forex Dealer',value:'43'},
	{label:'Government Body',value:'51'},
	{label:'Government Service',value:'2A'},
	{label:'Housewife',value:'6'},
	{label:'Insurance Company',value:'64'},
	{label:'NPS TRUST',value:'50'},
	{label:'Non-Government Service',value:'2B'},
	{label:'Not Specified',value:'9'},
	{label:'Others',value:'8'},
	{label:'PF Trust',value:'49'},
	{label:'Private Sector Service',value:'41'},
	{label:'Profession - Engineering',value:'3C'},
	{label:'Profession - Finance',value:'3B'},
	{label:'Profession - Legal',value:'3D'},
	{label:'Profession - Medicine',value:'3A'},
	{label:'Professional',value:'3'},
	{label:'Public Sector / Government Service',value:'42'},
	{label:'Retired',value:'5'},
	{label:'Service',value:'2'},
	{label:'Student',value:'7'}
]
export const INCOME_SLAB_NSE = [
	{APP_INCOME_DESC:'Below 1 Lakh',APP_INCOME_CODE:'31'},
	{APP_INCOME_DESC:'> 1 <=5 Lacs',APP_INCOME_CODE:'32'},
	{APP_INCOME_DESC:'>5 <=10 Lacs',APP_INCOME_CODE:'33'},
	{APP_INCOME_DESC:'>10 <= 25 Lacs',APP_INCOME_CODE:'34'},
	{APP_INCOME_DESC:'> 25 Lacs < = 1 Crore',APP_INCOME_CODE:'35'},
	{APP_INCOME_DESC:'Above 1 Crore',APP_INCOME_CODE:'36'}
]
export const ACCOUNT_TYPE_BSE = [
	{label:'Savings',value:'SB'},
	{label:'Current',value:'CB'},
// {label:'NRE Account',value:'NE'},
// {label:'NRO Account',value:'NO'}
]
export const ADDRESS_TYPE_BSE = [
	{label:'Residential or Business',value:1},
	{label:'Residential',value:2},
	{label:'Business',value:3},
	{label:'Registered Office',value:4},
	{label:'Unspecified',value:5}
]
export const WEALTH_SOURCE_BSE = [
	{label:'Salary',value:'01'},
	{label:'Business Income',value:'02'},
	{label:'Gift',value:'03'},
	{label:'Ancestral Property',value:'04'},
	{label:'Rental Income',value:'05'},
	{label:'Prize Money',value:'06'},
	{label:'Royalty',value:'07'},
	{label:'Others',value:'08'}
]
export const INCOME_SLAB_BSE = [
	{label:'Below 1 Lakh',value:'31'},
	{label:'> 1 <=5 Lacs',value:'32'},
	{label:'>5 <=10 Lacs',value:'33'},
	{label:'>10 <= 25 Lacs',value:'34'},
	{label:'> 25 Lacs < = 1 Crore',value:'35'},
	{label:'Above 1 Crore',value:'36'}
]
export const POLITICALLY_EXPOSED_BSE = [
	{label:'Yes',value:'Y'},
	{label:'No',value:'N'},
	{label:'Relative of the politically exposed person',value:'R'},
]
export const ID_DOCUMENT_TYPE_BSE = [
	{label:'Passport',value:'A'},
	{label:'Election ID Card',value:'B'},
	{label:'PAN Card',value:'C'},
	{label:'ID Card',value:'D'},
	{label:'Driving License',value:'E'},
	{label:'UIDIA / Aadhar letter',value:'G'},
	{label:'NREGA Job Card',value:'H'},
	{label:'Others',value:'O'},
	{label:'Not categorized',value:'X'},
	{label:'TIN [Tax Payer Identification Number]',value:'T'},
	{label:'Company Identification Number',value:'C1'},
	{label:'US GIIN',value:'G1'},
	{label:'Global Entity Identification Number',value:'E1'},
]
export const MANDATE_TYPE_BSE = [
	{label:'Physical',value:'X'},
	{label:'Digital',value:'I'},
]

export const MANDATE_TYPE_NSE = [
	{label:'NACH',value:'E'},
	{label:'Physical',value:'P'}
]
export const CALCULATOR_DATA = [
	{label:"Retirement Goal",value:"retirement",id:0, className:'retirementIcon'},
    {label:"Child Education",value:"childEducation",id:1, className:'educationIcon'},
    {label:"Marriage",value:"marriageCalculator",id:2, className:'marriageIcon'},
    {label:"Save Income Tax",value:"saveIncomeTax",id:3, className:'incomeTaxIcon'},
    {label:"Have Spare Money",value:"spareMoney",id:4, className:'spareMoneyIcon'},
    {label:"Build Wealth",value:"buildWealth",id:5, className:'buildWealthIcon'}
];

export const EXCHANGE_LIST = [
	{label:'NSE',value:1},
	{label:'BSE',value:2},
	{label:'MFU',value:3},
]
export const FATCA_EXCHANGE_LIST = [
	{label:'NSE',value:'N'},
	{label:'BSE',value:'B'},
	{label:'Others',value:'O'},
]
export const HOLDING_STATUS = [
	{label:'Anyone or Survivor',value:'AS'},
	{label:'Single',value:'SI'},
	{label:'Joint',value:'JO'},
	{label:'Either or Survivor',value:'ES'},
]
export const ACCOUNT_TYPE_NSE = [
	{label:'Savings',value:'SB'},
	{label:'Current',value:'CA'},
]

export const CUSTOM_ACCOUNT_TYPE_NSE = [
	{label:'Foreign Currency Non Resident (FCNR)',value:'FCNR'},
	{label:'Non Resident External Account (NRE)',value:'NRE'},
	{label:'Non Resident Ordinary (NRO)',value:'NRO'},
]

export const ERROR_MESSAGES = [
	{label:'File size is bigger',value:'01'},
	{label:'Investor age is not valid',value:'02'},
	{label:'Gaurdian age is not valid',value:'03'},
	{label:'Joint holder DOB is not valid',value:'04'},
	{label:'Please fill all fields',value:'05'},
	{label:'Invalid pin code',value:'06'},
	{label:'No data found againt IFSC code',value:'07'},
	{label:'Nominee Percentage cannot be zero',value:'08'},
	{label:'File name length bigger than 100 characters' ,value:'09'},
	{label: "Invalid Minor Nominee's DOB", value : '10'},
	{label: 'Error!!! Only PNG, JPG, JPEG files are allowed.', value: '11'}
]
export const SUCCESS_MESSAGES = [
	{label:'Already fatca Submitted',value:'01'},
]
export const BSE_ORDERS_STATUS = [
	{label:'Started',value:'started'},
	{label:'Failed',value:'failed'},
	{label:'Success',value:'success'}
]

export const USER_ACTIVE_STATUS = [
	{label:'Active',value:1},
	{label:'Inactive',value:0},
]

export const GRAPH_SCALE_UNIT = 100000
export const CLIENT_DASHBOARD_GRAPH_DIFFERENCE = 1000

export const INSURANCE_TABS = [
	{ label:'Life Insurance', value:0 , type:'lifeInsurance', category : "L" },
	{ label:'General Insurance', value:1, type:'generalInsurance', category : "G" }
	// { label:'Health Insurance', value:1, type:'healthInsurance', category : "M" },

]
export const INCENTIVE_TABS = [
	{ label: 'Incentive Added', value: 1, type: 'incentiveAdded'},
	{ label: 'Pending Clients', value: 0, type: 'pendingClient'}
]

export const INSURANCE_STATUS = [
	{label:'Active',value:'ACTIVE'},
	{label:'Inactive',value:'INACTIVE'}
]

export const LIFE_INSURANCE_STATUS = [
	{label:'Inforce',value:'INFORCE'},
	{label:'Paidup',value:'PAIDUP'},
	{label:'Lapsed',value:'LAPSED'},
	{label:'Withdrawn',value:'WITHDRAWN'},
	{label:'Cancelled',value:'CANCELLED'},
	{label:'Death Claim',value:'DEATH CLAIM'},
	{label:'Closed',value:'CLOSED'}
]

export const PAYMENT_SCHEDULE_INSURANCE = [
	{label:'Yearly',value:'Y'},
	{label:'Quarterly',value:'Q'},
	{label:'Half Yearly',value:'H'},
	{label:'Monthly',value:'M'},
	{label:'Single',value:'S'}
]

export const SEND_BIRTHDAY_MAIL_OPTIONS = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]

export const COMBINE_PURCHASE_SELL_TXN_TYPE_FILTER = [
	{label:'Purchase', value:'NRP',type:'purchase'},
	{label:'SIP', value:'SIP',type:'purchase'},
	{label:'Switch In', value:'SWI',type:'purchase'},
	{label:'Div Reinvest', value:'DIR',type:'purchase'},
	{label:'Bonus', value:'BON',type:'purchase'},
	{label:'Sell', value: 'NRS',type:'sell'},
	{label:'Switch Out', value: 'SWO',type:'sell'},
	{label:'SWP', value: 'SWP',type:'sell'},
	{label:'Div Payout', value: 'DVP',type:'sell'},
	{label:'Dividend Reinvestment', value : 'DRI'},
	{label:'Systematic Transfer In', value : 'STI'},
	{label:'Systematic Transfer Out', value : 'STO'},
	{label:'Bonus', value : 'BOS'},
	{label:'Dividend Paid', value : 'POS'},
	{label:'Purchase', value : 'ESP'},
	{label:'Purchase', value : 'EBP'},
	{label:'Sell', value : 'ESS'},
	{label:'Sell', value : 'EBS'},
	{label:'Bonus', value : 'BOB'},
	{label:'Interest', value : 'POB'},
]

export const TASKS_CATEGORIES = [
	{label:'General',value:'general'},
	{label:'Insurance',value:'insurance'},
	{label:'FMP',value:'FMP'},
	{label:'SIP',value:'SIP'},
	{label:'Birthday',value:'birthday'},
	{label:'Fixed Deposit',value:'FD'},
	{label:'Portfolio Review',value:'portfolio review'}
]

export const TASKS_CATEGORIES_FOR_DASHBOARD = [
	{label:'General',value:'general'},
	{label:'Upcoming Insurance Renewal',value:'insurance'},
	{label:'Upcoming FMP Maturity',value:'FMP'},
	{label:'SIP Due for Maturity',value:'SIP'},
	{label:'Upcoming Birthdays',value:'birthday'},
	{label:'Upcoming FD Maturity',value:'FD'}
]

export const TWO_FACTOR_AUTH_OPTIONS = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]

/*export const BROKERAGE_FILTER_TABS = [
{label:'Report Type', value:0 ,type:'reportType'},
{label:'Filter',  value:1, type:'filter'},
{label:'Export',  value:2, type:'export'},
]*/

export const BROKERAGE_GROUPBY = [
/*{levelName: 'All', levelNo:'', check: true},*/
	{levelName:"Fund",levelNo:1001},
	{levelName:"Scheme",levelNo:1002},
	{levelName:"Category",levelNo:1003},
	{levelName:"Transaction",levelNo:''}
]
export const PROTECTED_PDF_OPTIONS = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]

export const UPLOAD_OTHER_ASSET_CATEGORY = [
	{label:'Current Value', value :'currentValue', sampleFileName : 'currentValueSampleFile.xls' },
	{label:'Transaction', value :'transaction', sampleFileName : 'transactionSampleFile.xls'},
]

export const XLS_PREFERENCE_OPTIONS = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]

export const ENCRYPTION_UTIL = {
    encryptionSecretKey : "myS#cr#tK@y#####",
    ALGO : "aes-128-cbc",
    DIGEST : 'hex',
    ENCODING : 'utf8'
}
/*export const FOLIOLOOKUP_FILTER_TABS = [
{label:'Report Configuration', value:0 ,type:'reportConfiguration'}
]*/

export const MANDATE_TYPE_BSE_LABLES = [
	{label:'Digital',value:'I'},
	{label:'Physical',value:'X'},
]

/*export const SECURITY_EXPOSURE_FILTER_TABS = [
{label:'Report Configuration', value:0 ,type:'reportConfiguration'}
]*/

export const FILTER_TABS_OPTION = [
	{label:'Report Configuration', value:0 ,type:'reportConfiguration'}
]

export const SECURITY_EXPOSURE_REPORT_TYPE = [
	{label: 'Scheme Exposure', value: 'schemeExposure' },
	{label: 'Client Exposure', value: 'clientExposure' }
]

export const SECURITY_EXPOSURE_SCHEME_TYPE_LIST=[
	{label: 'Equity', value: 'equity'},
	{label: 'Non Equity', value: 'nonEquity'},
	{label: 'Both', value:''}
]

export const SECURITY_EXPOSURE_VIEW_TYPE=[
	{ label: 'On Screen', value: 'onScreen',method:'view' },
	{ label: 'XLS', value: 'XLS',  isAllowed: true, method:'export'}
]

export const FILE_TYPE=[
	{label: 'Document', value: 'DOCUMENT'},
	{label: 'Profile', value: 'PROFILE'},
	{label: 'Small Logo', value: 'SMALL_LOGO'},
	{label: 'Large Logo', value: 'LARGE_LOGO'}
]

export const DIRECT_SCHEME_OPTIONS = [
	{ label: "Regular" , value : 0 },
	{ label: "Direct" , value : 1 },
	{ label: "Both" , value : 2 },
]

export const PORTFOLIO_SCREENER_REPORT_TYPE = [
	{label: 'Client', value: 'clientWise' },
	{label: 'Family Head', value: 'familyHead' },
	{label: 'Folio', value: 'folioWise' },
]

export const PORTFOLIO_SCREENER_SCREEN_TYPE = [
	{ label: 'Portfolio Valuation', value: 'portfolioValuation' },
	{ label: 'Capital Gain Unrealized', value: 'capitalGainUnrealized' }
]

export const PORTFOLIO_SCREENER_REPORT_TYPE_SB = [
	{label: 'Client', value: 'clientWise' },
	{label: 'Scrip', value: 'scripWise' },
]

export const PORTFOLIO_SCREENER_ASSET_TYPE = [
	{label: 'Mutual Fund', value: 'mutualFund' },
	{label: 'Share & Bond', value: 'shareAndBond'}
]

export const PORTFOLIO_SCREENER_VIEW_TYPE = [
	{ label: 'On Screen', value: 'onScreen' ,method:'view' },
	{ label: 'XLS', value: 'XLS',  isAllowed: true ,method:'export'}
]

export const PORTFOLIO_SCREENER_HOLDING_DAYS_OPERATOR = [
	{ label: '>', value: 'holdingDaysGreaterThan' },
	{ label: '<', value: 'holdingDaysLessThan'},
	{ label: '=', value: 'holdingDays'}
]

export const IMAGE_EXTENSIONS = [
	'png',
	'jpg',
	'jpeg'
]
export const TAX_STATUS_MFU = [
	{label: 'Individual', value: 'RI' },
	{label: 'On Behalf of Minor', value: 'RM' }
]
export const TAX_STATUS_MFU_MAPPING = [
	{label: 'Individual', value: 'RI' },
	{label: 'On Behalf of Minor', value: 'RM' },
	{label: 'NRI-NRO', value: 'NNI' },
	{label: 'PIO', value: 'NPI' },
	{label: 'NRI-NRE', value: 'NRI' },
	{label: 'Foreign National', value: 'PI' },
	{label: 'Sole Proprietor', value: 'RS' },
	{label: 'NRI-NR0 (Minor)', value: 'NNM' },
	{label: 'PIO (Minor)', value: 'NPM' },
	{label: 'NRI-NRE (Minor)', value: 'NRM' },
	{label: 'Foreign National (Minor)', value: 'PM' }
]
export const RELATIONSHIP_LIST_MFU = [
	{label: 'Mother', value: '01' },
	{label: 'Father', value: '02' },
	{label: 'Court Appointed Legal Guardian', value: '03' }
]
export const RELATIONSHIP_PROOF_MFU = [
	{label: 'Birth Certificate', value: '01' },
	{label: 'Ration Card', value: '02' },
	{label: 'Passport', value: '03' },
	{label: 'PAN Card', value: '04' },
	{label: 'Court Order', value: '05' }
]
export const HOLDING_MFU = [
	{label:'Single' ,value:'SI'},
	{label:'Joint',value:'JO'},
	{label:'Anyone or Survivor',value:'AS'}
]
export const ACCOUNT_TYPE_MFU = [
	{label:'Savings',value:'SB'},
	{label:'Current',value:'CA'},
]
export const BANK_PROOF_MFU = [
	{label:'Latest Bank Passbook',value:14},
	{label:'Latest Bank Account Statement',value: 15},
	{label:'Cheque Copy',value: 77},
	{label:'Bank Letter',value: 78},
]
export const ADDRESS_TYPE_MFU = [
	{label:'Residential or Business',value:1},
	{label:'Residential',value:2},
	{label:'Business',value:3},
	{label:'Registered Office',value:4},
]
export const OCCUPATION_MFU = [
	{label:'Private Sector Service',value:'01'},
	{label:'Public Sector',value:'02'},
	{label:'Business',value:'03'},
	{label:'Professional',value:'04'},
	{label:'Agriculturist',value:'05'},
	{label:'Retired',value:'06'},
	{label:'Housewife',value:'07'},
	{label:'Student',value:'08'},
	{label:'Forex Dealer',value:'09'},
	{label:'Government Service',value:'10'},
	{label:'Doctor',value:'11'},
	{label:'Service',value:'12'},
	{label:'Others',value:'99'},
]
export const WEALTH_SOURCE_MFU = [
	{label:'Salary',value:'01'},
	{label:'Business Income',value:'02'},
	{label:'Gift',value:'03'},
	{label:'Ancestral Property',value:'04'},
	{label:'Rental Income',value:'05'},
	{label:'Prize Money',value:'06'},
	{label:'Royalty',value:'07'},
	{label:'Others',value:'08'}
]
export const INCOME_SLAB_MFU = [
	{label:'BELOW 1 LAC',value:'01'},
	{label:'1-5 LAC',value:'02'},
	{label:'5-10 LAC',value:'03'},
	{label:'10-25 LAC',value:'04'},
	{label:'25 Lacs to 1 Cr',value:'05'},
	{label:'Greater than 1 Cr',value:'06'}
]
export const POLITICALLY_EXPOSED_MFU = [
	{label:'Yes',value:'PEP'},
	{label:'No',value:'NA'},
	{label:'Relative of PEP',value:'RPEP'},
]
export const ID_DOCUMENT_TYPE_MFU = [
	{label:'Passport',value:'A'},
	{label:'Election ID Card',value:'B'},
	{label:'PAN Card',value:'C'},
	{label:'ID Card',value:'D'},
	{label:'Driving License',value:'E'},
	{label:'UIDIA / Aadhar letter',value:'G'},
	{label:'NREGA Job Card',value:'H'},
	{label:'Others',value:'O'},
	{label:'Not categorized',value:'X'},
	{label:'TIN [Tax Payer Identification Number]',value:'T'},
]
export const CAN_STATUS = [
	{label:'CAN Requested',value:'PE'},
	{label:'CAN Rejected',value:'RJ'},
	{label:'CAN Request Approved',value:'AP'},
	{label:'CAN Suspended',value:'SU'},
	{label:'CAN Cancelled',value:'CL'},
]
export const DOMAIN_LIST = [
	{label: 'Welcome to InvestWell' , value : 'investwell.app', showStoreLink:true,
	image:'/app/media/images/userImages/InvestWell.jpg',
	messages : "<p>Hey there, I'm Sunil Jain, CEO of InvestWell and I wanted to  personally "
	+" welcome you onboard and let you know that we are here to help if  you need anything.</p>"
	+ "<p>During your trial, we'll show you how you can start creating  Portfolio reports and make sure "
	+ " you have everything you need to support  your investors. Take this tour to see how.</p>"},

	{label: 'Welcome to InvestWell' , value : 'investwellonline.com' ,
	image:'/app/media/images/userImages/InvestWell.jpg',
	messages : "<p>Hey there, I'm Sunil Jain, CEO of InvestWell and I wanted to personally "
	+" welcome you onboard and let you know that we are here to help if  you need anything.</p>"
	+ "<p>During your trial, we'll show you how you can start creating Portfolio reports and make sure "
	+ " you have everything you need to support  your investors. Take this tour to see how.</p>"},
]
export const MONTH_LABEL_LIST = [
	{key:'Jan',value:'January'},
	{key:'Feb',value:'February'},
	{key:'Mar',value:'March'},
	{key:'Apr',value:'April'},
	{key:'May',value:'May'},
	{key:'Jun',value:'June'},
	{key:'Jul',value:'July'},
	{key:'Aug',value:'August'},
	{key:'Sep',value:'September'},
	{key:'Oct',value:'October'},
	{key:'Nov',value:'November'},
	{key:'Dec',value:'December'},
]

export const NATIVE_APP_LINKS = {
	"android" : "https://play.google.com/store/apps/details?id=com.iw.mint.app&hl=en",
	"ios" : "https://apps.apple.com/in/app/mint-by-investwell/id1479042500"
}
export const SOURCE_FILTER =[
	{label:'CAS',value:'cas'},
	{label:'Cron',value:'cron'},
	{label:'Manual',value:'manual'},
	{label:'MF Txns File',value:'mfTxnsFile'},
]

export const REGISTRAR = [
	{label:"Cams",value:"C"},
    {label:"Karvy",value:"K"}
]

export const CAPITAL_GAIN_ASSET_CLASS = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund'},
	{label:'Share & Bond',  value:1, type:'shareAndBond'}
]

export const AUM_REPORT_ASSET_CLASS = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund'},
	{label:'Share & Bond',  value:1, type:'shareAndBond'},
	{label:'Fixed Deposit', value:2, type:'fixedDeposit'},
	{label:'Other Assets',  value:4, type:'otherAssets'},
]

export const VIDEO_KYC_STATUS_LIST=[
	{ label: "Draft", value: "draft" },
	{ label: "Pending", value: "pending", showLink:true },
	{ label: "Accepted", value: "accepted", showLink:true},
	{ label: "Rejected", value: "rejected", showLink:true }
]

export const OTHER_ASSET_CATEGORY_TYPE=[
	{label: 'Equity', value: 1},
	{label: 'Debt', value: 0},
	{label: 'Both', value: null}
]

export const OTHER_ASSET_TYPES = [
	{label: 'Real Estate', value: 'RE'},
	{label: 'Gold', value: 'GD'},
	{label: 'PMS', value: 'PM'},
	{label: 'General', value:'GN'},
	{label: 'Insurance', value:'IN'},
	{label: 'Securities', value:'SC'},
	{label: 'PPF', value:'PP'},
	{label: 'LRS', value:'LR'},
	{label: 'AIF', value:'AI'},
	{label: 'EPF', value:'EP'},
]

export const COMMON_VIEW_TYPE =[
	{levelName:"On Screen", levelNo :'onscreen'},
	{levelName:"XLS",levelNo :'XLS', isAllowed: true }
]
export const SCHEME_FILTER =[
	{levelName:"Direct Only", levelNo : 1},
	{levelName:"All",levelNo : 0, }
]
export const METHOD_CALCULATION =[
	{levelName:"Flat Fee", levelNo :'CPF', showForm: true},
	{levelName:"AUM Based Fee",levelNo :'CPA', showForm: false}
]
export const COMPOSITE_GST = [
	{label:"Yes",value:1},
	{label:"No",value:0},
]

export const TRANSACTIONS_VIEW_ASSET_CLASS = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund'},
	{label:'Share & Bond',  value:1, type:'shareAndBond'},
	{label:'Fixed Deposit', value:2, type:'fixedDeposit'},
	{label:'Other Assets',  value:3, type:'otherAssets'}
]

export const GOAL_PLANNERS_TABS = [
	{label:'Mutual Fund', value:0 ,type:'mutualFund'},
	{label:'Share & Bond',  value:1, type:'shareAndBond'},
	{label:'Fixed Deposit', value:2, type:'fixedDeposit'},
	{label:'Other Assets',  value:3, type:'otherAssets'},
	{label:'Insurance',  value:4, type:'insurance'},
]

export const GOAL_PLANNERS_TYPES = [
	{label:"Goal Maker", value:'goalMaker'},
	{label:"Map Asset", value:'mapFund'},
	{label:"Goal  Status", value:'goalStatus'},
]

export const GOAL_PLANNERS_CATEGORY = [
	{label:"Education", value:0, iconName:"goalEducation.png"},
	{label:"Marriage", value:1, iconName:"goalMarriage.png"},
	{label:"Vacation", value:2, iconName:"goalVacation.png"},
	{label:"General", value:3, iconName:"goalGeneral.png"},
	{label:"Home", value:4, iconName:"goalHome.png"},
	{label:"Vehicle", value:5, iconName:"goalVehicle.png"},
	{label:"Retirement", value:5, iconName:"goalRetirement.png"}
]
export const SUBSCRIPTION_EXPIRATION = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]

export const MY_ORDERS_TABS = [
	{ label: "All Orders" , value : "allOrders" },
	{ label: "Cart" , value : "cart" }
]

export const REQUEST_SOA_FY = [
	{ label: "Current FY" , value : true },
	{ label: "Last FY" , value : false }
]

export const TRUE_FALSE_COMMON = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 }
]
export const excludedDefaultArns = ['CAS', 'ARN-00000','DIRECT']

export const FAVOURITE_FILTER = [
	{ label: "All" , value : 2 },
	{ label: "Favourites" , value : 1 }
]

export const SOURCE_CONST=[
	{label:"Mailback",value:"mailback"},
	{label:"Mailback1",value:"mailback1"},
	{label:"Mailback2",value:"mailback2"},
	{label:"Mailback3",value:"mailback3"},
	{label:"Mailback4",value:"mailback4"}
]
export const SHARDING_STATUS = [
	{ label: "Yes" , value : 1 },
	{ label: "No" , value : 0 },
	{ label: "In-progress" , value :-1}
]
export const DOMAIN_URL = [
	{ label:"investwell.app" , value : "investwell.app"},
	{ label:"my-portfolio.co.in", value : "my-portfolio.co.in"}
]

export const OPEN_URLS_FEATURES ={  'feature5001':{label:'calculator', url: '/calculator/'},
	'feature5002':{label:'graphCalculator', url: '/graphCalculator'},
	'feature5003':{label:'public', url: '/public/'},
	'feature5004':{label:'resetPassword', url: '/resetPassword/'},
	'feature5005':{label:'ForgotPassword', url: '/forgotPassword'},
	'feature5006':{label:'portalSettings', url:'/broker/portalSettings'},
	'feature5007':{label:'nseSettings',url:'/broker/nseSettings'},
	'feature5008':{label:'userSettings',url:'/broker/userSettings'},
	'feature5009':{label:'arnSettings',url:'/broker/arnSettings'},
	'feature5010':{label:'bseSettings',url:'/broker/bseSettings'},
	'feature5011':{label:'amcArnMapping',url:'/broker/amcArnMapping'},
	'feature5012':{label:'txnsSettings',url:'/broker/txnsSettings'},
	'feature5013':{label:'smtpSettings',url:'/broker/smtpSettings'},
	'feature5014':{label:'featuresPermission',url:'/broker/featuresPermission'},
	'feature5015':{label:'mobileAppConfiguration',url:'/broker/mobileAppConfiguration'},
	'feature5016':{label:'accountSettings',url:'/broker/accountSettings'},
	'feature5017':{label:'alertConfiguration',url:'/broker/alertConfiguration'},
	'feature5018':{label:'subscribe', url: '/subscribe'},
	'feature5019':{label:'Payout Rate Master', url: '/broker/payoutRateMaster'},
	'feature87':{label:'NPS Registration', url: '/broker/npsRegistration'},
	'feature5020':{label:'SMS Configuration for OTP', url: '/broker/smsConfiguration'},
	'feature5021':{label:'pmsSettings',url:'/broker/pmsSettings'},
	'feature5022':{label:'integratorCredentials',url:'/broker/integratorCredentials'},
	'feature5023':{label:'productsSubscription',url:'/broker/productsSubscription'}
}

export const DYNAMIC_URLS=[
	"/broker/investOnlineMain/1",
	"/broker/investOnlineMain/2",
	"/broker/investOnlineMain/3",
	"/broker/investOnlineMain/4",
	"/broker/investOnlineMain/5",
	"/broker/investOnlineMain/6",
	"/broker/investOnlineBSE/1",
	"/broker/investOnlineBSE/2",
	"/broker/investOnlineBSE/3",
	"/broker/investOnlineBSE/4",
	"/broker/investOnlineBSE/5",
	"/broker/investOnlineBSE/6",
	"/broker/investOnlineMFU/1",
	"/broker/investOnlineMFU/2",
	"/broker/investOnlineMFU/3",
	"/broker/investOnlineMFU/4",
	"/broker/investOnlineMFU/5",
	"/broker/investOnlineMFU/6",
	"/broker/transactionsView/shareAndBond",
	"/broker/transactionsView/fixedDeposit",
	"/broker/transactionsView/otherAssets",
	// "/broker/insurance/healthInsurance",
	"/broker/insurance/generalInsurance",
	"/broker/casImport/0",
	"/broker/casImport/2",
	"/broker/casImport/3",
	"/broker/casImport/4",
	"/broker/casImport/5",
	"/broker/casImport/6",
	"/broker/casImport/7",
	'/client/transactions/shareAndBond',
	//'/client/transactions/mutualFund',
	'/client/transactions/fixedDeposit',
	'/client/transactions/otherAssets',
	//'/client/insurance/lifeInsurance',
	// '/client/insurance/healthInsurance',
	"/broker/riskProfiling/submissions/pendingExpired",
	"/broker/riskProfiling/submissions/submissionLogs",

	'/client/insurance/generalInsurance',
	'/broker/aumReport/shareAndBond',
	'/broker/aumReport/fixedDeposit',
	'/broker/aumReport/otherAssets',
	'/broker/cashFlow/shareAndBond',
	'/broker/transactions/fixedDeposit',
	'/broker/transactions/otherAssets',
	'/broker/transactions/shareAndBond',
	'/broker/iMail/templates',
	'/client/newInvestment/nfoSchemes',
	'/client/mfuNewInvestment/nfoSchemes',
	'/client/bseNewInvestment/nfoSchemes',

	"/client/manageProfiles/0",
	"/client/manageProfiles/1",
	"/client/manageProfiles/2",
	"/client/manageProfiles/3",
	"/client/manageProfiles/4",
	"/client/manageProfiles/5",
	"/client/manageProfiles/6",
	"/client/bseManageProfiles/0",
	"/client/bseManageProfiles/1",
	"/client/bseManageProfiles/2",
	"/client/bseManageProfiles/3",
	"/client/bseManageProfiles/4",
	"/client/bseManageProfiles/5",
	"/client/bseManageProfiles/6",
	"/client/mfuManageProfiles/0",
	"/client/mfuManageProfiles/1",
	"/client/mfuManageProfiles/2",
	"/client/mfuManageProfiles/3",
	"/client/mfuManageProfiles/4",
	"/client/mfuManageProfiles/5",
	"/client/mfuManageProfiles/6",
]

export const REQUEST_SOA_TIME_PEROID = [
	{ label: "Since Inception", value:'SI' },
	{ label: "Current FY", value:'CF' },
	{ label: "Previous FY", value: 'PF' },
	{ label: "Custom", value: 'CU' }
]
export const ACTIONS_OPTION_LIST = [
	{label:"Merge FD Scheme",value:'mergeWith'},
]

export const TYPE_MAPPED = [
	{ label: "Scheme Merge", value:'SM' },
	{ label: "Stock Split", value:'SS' },
	{ label: "NAV Change", value: 'NC' },
]

export const ONBOARDING_OPTIONS = [
	{ label: "Allowed" , value : 1 },
	{ label: "Not Allowed" , value : 0 }
]

export const REPORT_TYPE = [
	{label:"Portfolio Valuation",value:'portfolioValuation'},
	{label:"Portfolio Summary",value:'portfolioSummary'},
	{label:"Recent Transactions",value:'recentTransactions'},
	{label:"Dashboard",value:'dashboard'}
]

export const INVESTONLINE_ORDER_STATUS = [
	{ label: "All", value:'' },
	{ label: "Processed", value:'PROCESSED' },
	{ label: "Pending", value:'PENDING' },
	{ label: "Submitted to RTA", value:'SUBMITTED_TO_RTA' },
	{ label: "Started", value:'STARTED' },
	{ label: "Failed", value:'FAILED' },
]

export const INVESTONLINE_ORDER_STATUS_VALUES= [
	{ value:'Pending Authorization' },
	{ value:'started' },
	{ value: null },
	{ value:'success' },
	{ value:'authentication' },
	{ value:'Not Available' },
	{ value:'Pending' },

]
export const MOBILE_LAYOUT_OPTIONS = [
	{ label: 1, value : 1 },
	{ label: 2, value : 2 },
	{ label: 3, value : 3 },
	{ label: 4, value : 4 },
	{ label: 5, value : 5 },
	{ label: 6, value : 6 },
]

export const BUSINESS_TYPE_OPTIONS = [
	{ label:'Advisor', value:'advisor' },
	{ label:'Investor', value:'investor' }
	
]

export const TOP_SCHEME_SEARCH_CRITERIA = [
	{ label: "Fund House", value:'fundHouse' },
	{ label: "Asset Type", value:'assetType' },
	{ label: "Category", value:'category' },
	{ label: "Performance Data", value:'performanceData' },
	{ label: "Expense Ratio (%)", value:'expenseRatio' },
	{ label: "Risk Ratio", value:'riskRatio' },
	{ label: "Min. Amount", value:'minAmount' },
	{ label: "Portfolio Corpus", value:'portfolioCorpus' },
	{ label: "Equity Fund Criteria", value:'equityFundCriteria' },
	{ label: "Debt Fund Criteria", value:'debtFundCriteria' },
	{ label: "Composite Rating", value:'compositeRating' },
	{ label: "Efficiency", value:'efficiency' },
]
 
export const PERFORMANCE_HORIZON_OPTIONS = [
	{ label: "30 Days Return(%)", minValueName:'min30Day', maxValueName:'max30Day' },
	{ label: "3 Months Return(%)", minValueName:'min3Month', maxValueName:'max3Month' },
	{ label: "6 Months Return(%)", minValueName:'min6Month', maxValueName:'max6Month' },
	{ label: "1 Year Return(%)", minValueName:'min1Year', maxValueName:'max1Year' },
	{ label: "2 Years Return(%)", minValueName:'min2Year', maxValueName:'max2Year' },
	{ label: "3 Years Return(%)", minValueName:'min3Year', maxValueName:'max3Year' },
	{ label: "5 Years Return(%)", minValueName:'min5Year', maxValueName:'max5Year' },
]

export const RISK_RATIO_OPTIONS = [
	{ label: "Standard Deviation (%)", minValueName:'minStandardDev', maxValueName:'maxStandardDev' },
	{ label: "Beta", minValueName:'minBeta', maxValueName:'maxBeta' },
	{ label: "Alpha (%)", minValueName:'minAlpha', maxValueName:'maxAlpha' },
	{ label: "Downside Deviation (%)", minValueName:'minDownsideDeviation', maxValueName:'maxDownsideDeviation' },
	{ label: "Downside Probability (%)", minValueName:'minDownsideProbability', maxValueName:'maxDownsideProbability' },
]
export const FUND_SCREENER_OPTION_MAPPING = {
	fundid : 'fundHouse',
	category : 'assetType',
	objectiveid : 'category',
	rating : 'compositeRating',
	min30Day : 'performanceData',
	minStandardDev : 'riskRatio',
	minSharpRatio : 'efficiency',
	minPERatio :'equityFundCriteria',
	minAvgMat :'debtFundCriteria',
	minExpenseRatio:'expenseRatio',
	minCorpus : 'portfolioCorpus',
	sipMinAmount : 'minAmount'
}
export const EXPENSE_RATIO_OPTIONS = [
	{ label: "", minValueName:'minExpenseRatio', maxValueName:'maxExpenseRatio' },
]

export const EFFICIENCY_OPTIONS = [
	{ label: "Sharpe Ratio (Rf=6%)", minValueName:'minSharpRatio', maxValueName:'maxSharpRatio' },
	{ label: "Sortino Ratio (MAR=0%)", minValueName:'minSortiINo', maxValueName:'maxSortiINo' },
]

export const EQUITY_FUND_CRITERIA_OPTIONS = [
	{ label: "P/E Ratio", minValueName:'minPERatio', maxValueName:'maxPERatio' },
	{ label: "P/B Ratio", minValueName:'minPBRatio', maxValueName:'maxPBRatio' },
]

export const DEBT_FUND_CRITERIA_OPTIONS = [
	{ label: "Average Maturity (yrs.)", minValueName:'minAvgMat', maxValueName:'maxAvgMat' },
	{ label: "Modified Duration (yrs.)", minValueName:'minModifiedDuration', maxValueName:'maxModifiedDuration' },
	{ label: "YTM (%)", minValueName:'minYtm', maxValueName:'maxYtm' },
]

export const MINIMUM_AMOUNT_OPTIONS = [
	{ label: "Min Purchase Amount", minValueName:'purchaseMinAmount', maxValueName:'purchaseMaxAmount' },
	{ label: "Min SIP Amount", minValueName:'sipMinAmount', maxValueName:'sipMaxAmount' },
]

export const PORTFOLIO_CORPUS_OPTIONS = [
	{ label: "", minValueName:'minCorpus', maxValueName:'maxCorpus' }
]

export const TOP_SCHEME_TABLE_TABS = [
	{ label: "All", value:'all' },
	{ label: "Snapshot", value:'snapshot' },
	{ label: "Short Term Returns", value:'shortTermReturns' },
	{ label: "Long Term", value:'longTerm' },
	{ label: "Ratios", value:'ratios' },
	{ label: "Debt Metrics", value:'debtMetrics' },
]

export const VIEW_TYPE_SCREEN_PDF =[
	{label:"On Screen", value :'onScreen'},
	{label:"PDF",value :'PDF' }
]
export const VIEW_TYPE_SCREEN_XLS =[
	{label:"On Screen", value:'onScreen' ,method:'view'},
	{label: "XLS", value: "xls", isAllowed: true ,method:'export' }
]
export const VIEW_TYPE_SCREEN_XLS_PDF =[
	{label:"On Screen", value:'onScreen',method:'view'},
	{label:"PDF",value :'PDF' ,method:'export'},
	{label: "XLS", value: "xls", isAllowed: true ,method:'export'},
]

export const typingPauseTimingForSearch = {delay : 400, delay600 : 600}

export const DATE_RANGE_MESSAGE = [
	{label : 'Date range should be less than 1 year'},
	{label : 'Date range should be less than 3 years'},
	{label : 'Date range should be less than 12 years'},
]
export const REPORT_TYPE_LIST = [
	{label:"Summary",value:'1005',},
	{label:"Details",value:'1008'}, 
]
export const ARN_TYPE_LIST = [
	{value : 'camsCredentialsStatus'},
	{value : 'karvyCredentialsStatus'},
	{value : 'franklinCredentialsStatus'},
	{value : 'nseCredentialsStatus'},
	{value : 'bseCredentialsStatus'},
	{value : 'fundsnetCredentialsStatus'},
	{value : 'edge360CredentialsStatus'},
]
export const MFU_TXNS_TYPES = [
	{label:'Purchase', value:'NRP'},
	{label:'SIP', value:'SIP'},
	{label:'Redemption', value: 'NRS'},
	{label:'Switch Out', value: 'SWO'},
	{label:'STP', value:'STP'},
	{label:'SWP', value: 'SWP'}
]
export const APPROVAL_TYPE_NSE = [
	{label:'Debit Card', value:'DC'},
	{label:'Net Banking', value:'NET'},
	{label:'Aadhaar Card', value:'AA'}
]
export const LEVEL_NUMBERS_FOR_INFO = {
	1: {levelNo: 1},
	2: {levelNo: 2},
	3: {levelNo: 3},
	4: {levelNo: 4},
	5: {levelNo: 5},
	6: {levelNo: 6},
	7: {levelNo: 7},
	31: {levelNo: 31},
	32: {levelNo: 32}
}
export const NOMINEE_TYPE = [
	{levelName:'Major',levelNo:'N'},
	{levelName:'Minor',levelNo:'Y'},
]
export const NOMINEE_OPT_TYPE =[
	{levelName:'Yes',levelNo:'Y'},
	{levelName:'No',levelNo:'N'},
	{levelName:'No, but verify later',levelNo:'X'}

]
export const CATEGORY_A_TO_Z_OPTION = [
	{label : 'A'},
	{label : 'B'},
	{label : 'C'},
	{label : 'D'},
	{label : 'E'},
	{label : 'F'},
	{label : 'G'},
	{label : 'H'},
	{label : 'I'},
	{label : 'J'},
	{label : 'K'},
	{label : 'L'},
	{label : 'M'},
	{label : 'N'},
	{label : 'O'},
	{label : 'P'},
	{label : 'Q'},
	{label : 'R'},
	{label : 'S'},
	{label : 'T'},
	{label : 'U'},
	{label : 'V'},
	{label : 'W'},
	{label : 'X'},
	{label : 'Y'},
	{label : 'Z'},
]
export const PAYMENT_MODE = [
	{levelName:'Cheque',levelNo:'cheque'},
	{levelName:'NEFT',levelNo:'rtgs/neft'},
]
export const PAYMENT_MODE_MFU_MANDATE = [
	{ label: 'Net Banking', value: 'PN'},
	{ label: 'Debit Card', value: 'PD'}
]

export const AMC_BILL_TYPE = [
	{ label: 'AMC Bill', value: 'ATN'},
	{ label: 'Credit Note', value: 'CN'}
]
export const ACCOUNT_TYPE = [
	{levelName:'Savings',levelNo:'SB'},
	{levelName:'Current',levelNo:'CA'},
]

export const ALL_ARN = [
	{label: 'All My ARNs', value: ''},
	{label: 'All', value: 'all'}
]
export const GENDER = [
	{label: 'Male', value: 'M'},
	{label: 'Female', value: 'F'},
]

export const GENDER_LIST = [
	{label: 'Male', value: 'M'},
	{label: 'Female', value: 'F'},
	{label: 'Transgender', value: 'T'}
]

export const TITLE = [
	{label: 'Kumari', value: 'KUMARI'},
	{label: 'Shri', value: 'SHRI'},
	{label: 'Smt', value: 'SMT'}
]

export const MARITAL_STATUS = [
	{label: 'Divorcee', labelValue: 'DIVORCEE', value:'D'},
	{label: 'Married', labelValue: 'MARRIED', value:'M'},
	{label: 'Un Married', labelValue: 'UNMARRIED', value:'U'},
	{label: 'Widow/Widower', labelValue: 'WIDOW/WIDOWER', value:'W'}

]

export const PROOF_DOCUMENT = [
	{label: 'Aadhar Card', labelValue: 'AADHAR_CARD', value:'150'},
	{label: 'Driving Licence', labelValue: 'DRIVING_LICENCE', value:'104'},
	{label: 'Job Card', labelValue: 'JOB_CARD', value:'152'},
	{label: 'Passport', labelValue: 'PASSPORT', value:'103'},
	{label: 'Voter ID', labelValue: 'VOTER_ID', value:'107'}

]

export const OCCUPATION =[
	{label: 'Home Maker', labelValue: 'HOMEMAKER', value:'10'},
	{label: 'Private Sector', labelValue: 'PRIVATE_SECTOR', value:'03'},
	{label: 'Professional', labelValue: 'PROFESSIONAL', value:'08'},
	{label: 'Public Sector', labelValue: 'PUBLIC_SECTOR', value:'07'},
	{label: 'Self Employed', labelValue: 'SELF_EMPLOYED', value:'02'},
	{label: 'Others', labelValue: 'OTHERS',value:'06'},
]
export const CAPITAL_GAIN_UNREALIZED_REPORT_TYPES_FOR_PDF_XLS=[
	{label:'Detail',type:'detailed'},
	{label:'Summary',type:'summary'},
]
export const REPORT_TYPES_FOR_PDF_XLS=[
	{label:'Summary',type:'summary'},
	{label:'Detail',type:'detailed'},
]
export const THEME_BORDER_OPTION = [
	{levelName: 'No Border, alternate row shading', levelNo: 0},
	{levelName: 'With border', levelNo: 1}
]
export const SMS_CONFIGURATION_OPTION=[
	{levelName: 'Use IWSOFT as sender id', levelNo: 0},
	{levelName: 'Set up your own SMS gateway', levelNo: 1}
]
export const BROKERAGE_ADDITIONAL_GROUPBY = [
	{levelName:"Rate",levelNo:1011},
]
export const TAX_STATUS_CUSTOM_BROKER_BSE = [
	{label:'Individual' ,value:'01',showDeclaration:true, removeVideoKycOpts:false, showNomineeAuthentication:true, twoFactorAuthentication:true},
	{label:'On Behalf Of Minor',value:'02', handleMinorCase : true, holdingNatureSingle : true, showDeclaration:true, removeVideoKycOpts:false,twoFactorAuthentication:true},
	{label:'HUF' ,value:'03', hideNomineeAndGender : true, companyPanValidationTrue : true, hideEditOption : true, holdingNatureSingle : true, showDeclaration:false, removeVideoKycOpts:false},
	{label:'NRI-Others' ,value:'11', showForeignAddress : true, hideNomineeAndGender : true,holdingNatureSingle : false, showDeclaration:false, removeVideoKycOpts:true,twoFactorAuthentication:true},
	{label:'NRI - NRE (Repatriation)',value:'21', showForeignAddress : true,holdingNatureSingle : false, showDeclaration:true, removeVideoKycOpts:true, showNomineeAuthentication:true,twoFactorAuthentication:true},
	{label:'NRI - NRO [Non Repatriation]' ,value:'24', showForeignAddress : true,holdingNatureSingle : false, showDeclaration:true, removeVideoKycOpts:true, showNomineeAuthentication:true,twoFactorAuthentication:true},
	{label:'NRI - Minor (NRE)' ,value:'26',handleMinorCase : true, showForeignAddress : true, minorCaseHideNominee : true, holdingNatureSingle : true, showDeclaration:true, removeVideoKycOpts:true,twoFactorAuthentication:true},
	{label:'NRI-HUF(NRO)',value:'27', showForeignAddress : true, hideNomineeAndGender : true, companyPanValidationTrue : true, hideEditOption : true,holdingNatureSingle : true, showDeclaration:false, removeVideoKycOpts:true},
	{label:'NRI - Minor (NRO)' ,value:'28', handleMinorCase : true, showForeignAddress : true, minorCaseHideNominee : true, holdingNatureSingle : true, showDeclaration:true, removeVideoKycOpts:true,twoFactorAuthentication:true},
	{label:'NRI-HUF(NRE)',value:'29', showForeignAddress : true, hideNomineeAndGender : true, companyPanValidationTrue : true, hideEditOption : true, holdingNatureSingle : true, showDeclaration:false, removeVideoKycOpts:true},    //need to verify once
]

export const CUSTOM_MINOR_TAX_STATUS_CODE = ['02', '11', '21', '24', '26', '27', '28', '29']

export const ACCOUNT_TYPE_CUSTOM = [
	{label:'NRE',value:'NE'},
	{label:'NRO',value:'NO'}
]
export const CORPORATE_SERVICE_SECTOR = [
	{label:'Foreign Exchange / Money Changer Services',value:'01'},
	{label:'Gaming / Gambling / Lottery Services',value:'02'},
	{label:'Money laundering / Pawning',value:'03'},
	{label:'to be blank if the same is not applicable',value:'04'},
]
export const FFI_DRNFE = [
	{label:'FFI',value:'FFI'},
	{label:'DRNFE',value:'DRNFE'},
	{label:'NA',value:'NA'}
]
export const UBO_ADDRESS_TYPE = [
	{label:'Residential or Business',value:'1'},
	{label:'Residential',value:'2'},
	{label:'Business',value:'3'},
	{label:'Registered Office',value:'4'},
	{label:'Unspecified',value:'5'},
]
export const OTHER_GENDER = [
	{label: 'Other', value: 'O'}
]
export const OCCUPATION_TYPE = [
	{label: 'Service', value: 'S'},
	{label: 'Business', value: 'B'},
	{label: 'Others', value: 'O'},
	{label: 'Not Categorized', value: 'X'},
]
export const UBO_CODE = [
	{label: 'CP of legal person-ownership', value: 'C01'},
	{label: 'CP of legal person-other means', value: 'C02'},
	{label: 'CP of legal person-senior managing official', value: 'C03'},
	{label: 'CP of legal arrangement-trust-settlor', value: 'C04'},
	{label: 'CP of legal arrangement-trust-trustee', value: 'C05'},
	{label: 'CP of legal arrangement-trust-protector', value: 'C06'},
	{label: 'CP of legal arrangement-trust-beneficiary', value: 'C07'},
	{label: 'CP of legal arrangement-trust-other', value: 'C08'},
	{label: 'CP of legal arrangement-trust-other-settlor equivalent', value: 'C09'},
	{label: 'CP of legal arrangement-trust-other-trustee-equivalent', value: 'C10'},
	{label: 'CP of legal arrangement-trust-other-protector equivalent', value: 'C11'},
	{label: 'CP of legal arrangement-trust-other-beneficiary-equivalent', value: 'C12'},
	{label: 'CP of legal arrangement-trust-other-other-equivalent', value: 'C13'},
	{label: 'Unknown', value: 'C14'},
]
export const DECLARATION_FLAG = [
	{label: 'Yes', value: 'Y'},
	{label: 'No', value: 'N'},
]
export const UPDATE_INDICATOR = [
	{label: 'New', value: 'N'},
	{label: 'Change', value: 'C'},
]
export const NON_FINANCIAL_SUB_CATEGORY = [
	{label: '01', value: '01'},
	{label: '02', value: '02'},
	{label: '03', value: '03'},
	{label: '04', value: '04'},
	{label: '05', value: '05'},
	{label: '06', value: '06'},
	{label: '07', value: '07'},
]
export const NON_FINANCIAL_CATEGORY = [
	{label: 'Listed entity', value: 'L',stockExchange:true},
	{label: 'Related to listed entity', value: 'RL',stockExchange:true},
	{label: 'Active NFFE', value: 'A'},
	{label: 'Passive NFFE', value: 'P'},
	{label: 'Not Applicable -for Non NFFE', value: 'NA'},
]
export const UBO_IDENTIFICATION_TYPE = [
	{label: 'Passport', value: 'A'},
	{label: 'Election ID Card', value: 'B'},
	{label: 'PAN Card', value: 'C'},
	{label: 'ID Card', value: 'D'},
	{label: 'Driving License', value: 'E'},
	{label: 'UIDIA / Aadhar letter', value: 'G'},
	{label: 'NREGA Job Card', value: 'H'},
	{label: 'Others', value: 'O'},
	{label: 'Not categorized', value: 'X'},
	{label: 'TIN [Tax Payer Identification Number', value: 'T'},
	{label: 'Company Identification Number', value: 'C1'},
	{label: 'US GIIN', value: 'G1'},
	{label: 'Global Entity Identification Number', value: 'E1'},
]
export const EXEMPTION_CODE_OPTION = [
	{label: 'A', value: 'A'},
	{label: 'B', value: 'B'},
	{label: 'C', value: 'C'},
	{label: 'D', value: 'D'},
	{label: 'E', value: 'E'},
	{label: 'F', value: 'F'},
	{label: 'G', value: 'G'},
	{label: 'H', value: 'H'},
	{label: 'I', value: 'I'},
	{label: 'J', value: 'J'},
	{label: 'K', value: 'K'},
	{label: 'L', value: 'L'},
	{label: 'M', value: 'M'},
	{label: 'N', value: 'N'},
]
export const GIIN_CODE_OPTION = [
	{label: 'Applied for', value: 'AF'},
	{label: 'Not required to apply for', value: 'NR'},
	{label: 'Not obtained', value: 'NO'},
	{label: 'Non-participating', value: 'FI'},
]
export const GIIN_EXEMPTION_CODE = [
	{label: '01', value: '01'},
	{label: '02', value: '02'},
	{label: '03', value: '03'},
	{label: '04', value: '04'},
	{label: '05', value: '05'},
	{label: '06', value: '06'},
	{label: '07', value: '07'},
	{label: '08', value: '08'},
	{label: '09', value: '09'},
	{label: '10', value: '10'},
	{label: '11', value: '11'},
	{label: '12', value: '12'},
	{label: '13', value: '13'},
	{label: '14', value: '14'},
]
export const IS_MANUAL_ENTRY = [
	{levelName: 'All', levelNo: null},
	{levelName: 'Yes', levelNo: 1},
	{levelName: 'No', levelNo: 0},
]

export const DATA_DELETION_MODE = [
	{levelName: 'Transaction', levelNo: 0, apiName : 'deleteBrokerTxns', isExchange: false},
	{levelName: 'Brokerage', levelNo: 1, apiName : 'deleteBrokerBrokerage', isExchange: false},
	{levelName: 'SIP', levelNo: 2, apiName : 'deleteBrokerSip', isExchange: false},
	{levelName: 'NSE', levelNo: 3, apiName : 'deleteBrokerNseData', isExchange: true},
	{levelName: 'BSE', levelNo: 4, apiName : 'deleteBrokerBseData', isExchange: true},
	{levelName: 'MFU', levelNo: 5, apiName : 'deleteBrokerMfuData', isExchange: true},
]

export const BROKERAGE_TYPE_MODE = [
	{levelName: 'Delete Data', levelNo: 0, apiName : 'deleteBrokerBrokerage'},
	{levelName: 'Transfer ARN', levelNo: 1, apiName: 'transferArn'}
]

export const EXCHANGE_LIST_ITEM = [
	{label: 'Profile List', value: 'profileList'},
	{label: 'Mandate List', value: 'mandateList'},
	{label: 'Orders', value: 'orders'}
]

export const PASSWORD_CHECKER = ['123456']

export const SOURCE_TXNS_FILE = [
	{label:"MF_TXNS_FILE",value:'mfTxnsFile'},
	{label:"CAS",value:'cas'}
]
export const NUMBER_OF_HOLDINGS = [
	{label:"10",value:10},
	{label:"20",value:20},
	{label:"50",value:50},
	{label:"All",value:''},
]
export const COMBINE_TXN_TYPE_FILTER_CONSTANT = [
	{label:'Purchase', value:'NRP',type:'purchase'},
	{label:'SIP', value:'SIP',type:'purchase'},
	{label:'STI', value : 'STI'},
	{label:'Switch In', value:'SWI',type:'purchase'},
	{label:'Dividend Reinvest', value:'DIR',type:'purchase'},
	{label:'Bonus', value:'BON',type:'purchase'},
	{label:'Sell', value: 'NRS',type:'sell'},
	{label:'STO', value : 'STO'},
	{label:'Switch Out', value: 'SWO',type:'sell'},
	{label:'SWP', value: 'SWP',type:'sell'},
	{label:'Dividend Payout', value: 'DVP',type:'sell'},
	
]

export const INVESTONLINE_DOCUMENT_TYPE = [
	{label:'PAN',value:'A'},
	{label:'Cancelled Cheque',value:'B'},
	{label:'Proof of Address',value:'C'},
]
export const GUARDIAN_RELATION_LIST = [
	{label:'Father', value :'F' },
	{label:'Mother', value :'M' },
	{label:'Court Appointed Legal Guardian', value :'C' }
 ]

export const MOBILE_EMAIL_RELATION_LIST = [
	{label:'SELF', value :'SE' },
	{label:'SPOUSE', value :'SP' },
	{label:'DEPENDENT CHILDREN', value :'DC' },
	{label:'DEPENDENT SIBLINGS', value :'DS' },
	{label:'DEPENDENT PARENTS', value :'DP' },
	{label:'GUARDIAN', value :'GD' },
	{label:'PMS', value :'PM' },
	{label:'CUSTODIAN', value :'CD' },
	{label:'POA', value:'PO'}
 ]
 export const MFU_MOBILE_EMAIL_RELATION_LIST = [
	{label:'SELF', value :'S' },
	{label:'FAMILY', value :'F' }
 ]
export const BSE_CLIENTS_STATUS = [
	{label:'ALL',value:null},
	{label:'ACTIVE',value:'ACTIVE'},
	{label:'CXL',value:'CXL'},
	{label:'AUTOCXL ',value:'AUTOCXL'},
	{label:'SUSPENDED ',value:'SUSPENDED'}
]
export const NSE_CLIENTS_STATUS = [
	{label:'Running',value:'running'},
	{label:'Pause',value:'pauseSip'},
	{label:'Step up and Top up',value:'stepUpAndTopUp'},
	{label:'Ceased',value:'ceasedSip'}
]

export const ALL_EXCHANGE_ORDER_TYPE = [
	{label: 'System Orders', value: 'systemOrders' },
	{label: 'All Orders', value: 'allOrders'}
]
export const COMPREHENSIVE_DATA_OPTIONS= [
	{levelName: 'No Benchmark', levelNo: 'noBenchmark' },
	{levelName: 'Scheme Benchmark', levelNo: 'schemeBenchmark'},
	{levelName: 'Broad Benchmark', levelNo: 'broadBenchmark'}
]
export const BSE_TRANSACTION_TYPE = [
	{label: 'Purchase', value: 'P' },
	{label: 'Sell', value: 'R'}
]

export const PURCHASE_ORDER_TYPE = [
	{label: 'All', value: 'ALL'},
	{label: 'Lumpsum', value: 'NRM' },
	{label: 'SIP', value: 'SIP'},
	{label: 'XSP', value: 'XSP' },
	{label: 'ISIP', value: 'ISIP'},
	{label: 'Switch', value: 'SWITCH' },
	{label: 'STP', value: 'STP' }
]

export const SELL_ORDER_TYPE = [
	{label: 'All', value: 'ALL'},
	{label: 'Lumpsum', value: 'NRM' },
	{label: 'SWP', value: 'SWP'},
	{label: 'Switch', value: 'SWITCH' },
	{label: 'STP', value: 'STP' }
]

export const BSE_TRANSACTION_STATUS = [
	{label: 'All', value: 'ALL'},
	{label: 'Valid', value: 'VALID' },
	{label: 'Invalid', value: 'INVALID'}
]

export const NSE_TRANSACTION_STATUS = [
	{label:'ALL', value:'ALL'},
	{label:'Authorized', value:'C'},
	{label:'Pending', value:'P'},
	{label:'Processed', value:'A'},
	{label:'Rejected/Reversed', value:'R'},
	{label:'Submitted To RTA', value:'RT'},
 ]  
 export const NSE_TRANSACTION_TYPE = [
	{label:'ALL', value:'A'},
	{label:'Purchase', value:'P'},
	{label:'Redemption', value:'R'},
	{label:'Switch', value:'S'},
	{label:'Triggered Trxn', value:'T'},
 ]
 export const PROFILE_TYPE = [
	{label:"Physical", value:'N'},
	{label:"Demat", value:'Y'}
]
 export const ALL_ASSETS = [
	{ label: 'Shares', value: 'S' },
	{ label: 'Bonds', value: 'B' },
	{ label: 'Mutual Fund', value: 'MF' },
	{ label: 'Fixed Deposit', value: 'FD' },
	{ label: 'Real Estate', value: 'RE' },
	{ label: 'Gold', value: 'GD' },
	{ label: 'PMS', value: 'PM' },
	{ label: 'General', value: 'GN' },
	{ label: 'Insurance', value: 'IN' },
	{ label: 'Securities', value: 'SC' },
	{ label: 'PPF', value: 'PP' },
	{ label: 'LRS', value: 'LR' },
	{ label: 'AIF', value: 'AI' },
	{ label: 'EPF', value: 'EP' },
 ]
export const INVESTOR_SEARCH_TYPE = [
	{ label: 'Investor', levelNo: 100 , fhOrClWithoutFh: 0 },
	{ label: 'Family Head', levelNo: 98, fhOrClWithoutFh: 1 }
]
export const SCHEME_SAVING_NOTE = [
	{ label: "Potential Saving" },
	{ label: "Savings Achieved" }
]
export const CRON_RUNNING_STATUS = [
	{label:"Yes", value:true},
	{label:"No", value:false}
]

export const CORPORATE_ACTIONS_TYPE = [
	{label:"Face Value Change",value:'faceValueChange', dateType : 'actionDate'},
	{label:"Dividend/Interest",value:'dividend', dateType : 'divDate'},
	{label:"Bonus",value:'bonus' , dateType : 'bonusDate'},
]
export const NOMINATION_AUTHENTICATION_MODES = [
	{label:"eSign", value:'E'},
	{label:"OTP Authentication", value:'O'},
	{label:"Wet Signature", value:'W'}
]

export const WISH_TO_NOMINATE_OPTIONS = [
	{label:"Yes, I wish to nominate", value:'Y'},
	{label:"No, I don't wish to nominate", value:'N'}
]

export const BACK_OFFICE_LEVEL_NO = [30, 31, 32]

export const MFU_SOURCE_LIST = [
	{label:"Folio", value:'folio'},
	{label:"Mint", value:'mint'},
	{label:"Bulk Upload", value:'bulkUpload'}
 ]
 export const ACCESS_TABS = [
	{label:"Users", value:"userSetting"},
	{label:"Access Permission", value:"accessPermission"}
 ]
export const WATCHLIST_TABS = [
	{ label: 'Days Change', value: 'daysChange' },
	{ label: 'Historical Change', value: 'historicalChange' },
]

 export const EDIT_DELETE_APIS_CREDENTIALS = [
	{createApiName:'createOrUpdateRole',deleteApiName:'deleteRole'}
]

 export const CRON_CATEGORY_TYPE = [
	{label:'Data Crons', value:'DataCrons'},
	{label:'System Crons', value:'SystemCrons'},
	{label:'Third Party Crons', value:'ThirdPartyCrons'},
	{label:'Emailing Crons', value:'EmailingCrons'},
	{label:'One Time Emailing Crons', value:'OneTimeEmailingCrons'},
	{label:'Python Crons', value:'PythonCrons'},
	{label:'Whatsapp Operations Crons',value:'WhatsappOperationsCrons'}
 ]  
 export const TRUE_FALSE_CONSTANT = [
	{label:'True', value:'true'},
	{label:'False', value:'false'}
 ]
 export const CRON_PRIORITY_LIST = [
	{label:'P1', value:'P1'},
	{label:'P2', value:'P2'},
	{label:'P3', value:'P3'},
]
export const CRON_DURATION = [
	{label:'All', value:'false'},
	{label:'>0', value:'true'}
 ]

export const CRON_TYPE = [
	{label:'GET',value:'GET'},
	{label:'POST',value:'POST'},
]
export const CRON_STATUS = [
	{label:'ACTIVE',value:'active'},
	{label:'INACTIVE',value:'inactive'},
]
export const MANDATE_STATUS_OPTIONS = ['REJECTED','APPROVED','rejected','approved']

export const TAX_STATUS_NOMINEE = ['01','24','21']

export const CREATE_INVESTOR_TABS = [
	{label : 'personalInfo' , value : 0},
	{label : 'accountDetails' , value : 1 },
	{label : 'bankDetails', value : 2 },
	{label : 'otherAttributes', value : 3 },
	{label : 'nomineeDetails' , value : 4 },
	{label : 'kycDetails' , value : 5 },
	{label : 'fatca' , value : 6}
]

export const POLICY_TABS = [
	{label:"Privacy Policy", value:"privacy"},
	{label:"Terms & Conditions", value:"terms"},
	{label:"Disclaimers", value:"disclaimer"},
	{label:"Help", value:"help"}
]
export const NAV_GRAPH_PERIOD = [
	{label : '1Y', value : 1},
	{label : '3Y', value : 3},
	{label : '5Y', value : 5},
	{label : 'MAX', value : 'max'},
]
export const DEFAULT_MSG_VALUE = [ 'Not Available','0' ]

export const LINKED_PARAM_CLIENT = { dashboard: 'dashboard', portfolio: 'portFolioSummary/mutualFund', portfolioValuation: 'portfolioValuation', recentTransactions: 'transactions/mutualFund', folios: 'folioLookup' }

export const ADMIN_LOGIN_HISTORY_REASON = [
	{ label: "Solving Ticket", value: "ST" },
	{ label: "Phone Query", value: "PQ" },
	{ label: "Self Initiated", value: "SI" },
	{ label: "Training", value: "TR" }
]

export const CLIENT_TRANSACTION_TABS = [
	{label: "Purchases", value: "purchase"},
	{label: "Redemptions", value: "redemption"}
]

export const SUMMARY_TABS = [
	{label: "Purchase Value", value: "purchaseValue"},
	{label: "Current Value", value: "currentValue"},
	{label: "Unrealized Gain", value: "gain"},
	{label: "One Day Change", value: "oneDayChange"}
]

export const ALL_ASSETS_TABS = [
	{label: "Mutual Fund", iconClass: "chartIcons mfIcon", value: "mf"},
	{label: "Share & Bond", iconClass: "chartIcons sbIcon", value: "sb"},
	{label: "Fixed Deposit", iconClass: "chartIcons fdIcon", value: "fd"},
	{label: "Other Assets", iconClass: "chartIcons assetIcon", value: "oa"}
]

export const FEATURE_INFO_CAS_IMPORT = [
	'Enhanced holistic wealth management.',
	'Strengthened client relationships through personalized advice.',
	'Increased assets under management (AUM).',
	'Improved risk management capabilities.',
	'Convenience of consolidating accounts.',
	'Potential for higher fee-based revenue.',
	'More detailed reporting and analysis.',
	'Better regulatory compliance and client transparency.'
]

export const HOLDER_MAPPING = [
	{label:"1st Holder", value:'investor'},
	{label:"2nd Holder", value:'JH1'},
	{label:"3rd Holder", value:'JH2'}
 ]
export const PORTFOLIO_SNAPSHOT_MAPPING = [
	{ label: "Opening Balance :", value: "openingBalance", indexVal: 1 },
	{ label: "Purchase", value: "purchaseValue", indexVal: 2 },
	{ label: "Switch In", value: "switchIn", indexVal: 3 },
	{ label: "Switch Out", value: "switchOut", indexVal: 4 },
	{ label: "Div. PayOut", value: "dividend", indexVal: 5 },
	{ label: "Redemption", value: "redemptionAmount", indexVal: 6 },
	{ label: "Net Addition", value: "netAddition", indexVal: 7 },
	{ label: "Closing Balance", value: "currentValue", indexVal: 8 },
	{ label: "Net Gain :", value: "gain", indexVal: 9 },
	{ label: "XIRR(%) :", value: "XIRR", indexVal: 10 }
]
 export const DOWNLOAD_REPORT_TYPES = [
	{label: 'Lost Brokerage', value: 'Lost Brokerage'},
	{label: 'SOA', value: 'SOA'},
	{label: 'Unrealized Capital Gain', value: 'Unrealized Capital Gain'}
]

export const IFA_INTEGRATORS_LIST = {
	liquiloan:'LIQUILOAN',
	pms:'PMS'
}
export const MOBILE_EMAIL_CONST = [
	{levelName: 'Mobile', levelNo: true},
	{levelName: 'Email', levelNo: false}
]	

export const TXN_TYPE_FILTER_CONSTANT = [
	{'SIP':'greenColor'},
	{'NRP':'greenColor'},
	{'SWI':'greenColor'},
	{'DIR':'greenColor'},
	{'BON':'greenColor'},
	{'ESP':'greenColor'},
	{'EBP':'greenColor'},
	{'STI':'greenColor'},
	{'SWP':'yellowColor'},
	{'NRS':'yellowColor'},
	{'ESS':'yellowColor'},
	{'EBS':'yellowColor'},
	{'SWO':'yellowColor'},
	{'SWP':'yellowColor'},
	{'SWP':'yellowColor'}
]

export const BROKERAGE_RECONCILIATION_GROUPBY = [
	{levelName:"Fund",levelNo:1001},
	{levelName:"Scheme",levelNo:1002},
	{levelName:"Transaction",levelNo:''}
]
export const MEETING_NOTE_TABS = [
	{ label:'My Notes', value:0 , type:'myNotes', category : "M" },
	{ label:'All Notes', value:1, type:'allNotes', category : "A" }
]
export const BROKERAGE_RECONCILIATION_CHECK_TYPE = [
	{levelName: "All", levelNo:100},
	{levelName: "Mismatch Only",levelNo: 101},
  	{levelName: "Higher Rate Receivable",levelNo: 102},
  	{levelName: "Lower Rate Receivable",levelNo: 103}
]

export const ALL_ACCOUNT_TYPE = [
	{label:'Savings',value:'SB'},
	{label:'Current',value:'CB'},
	{label:'NRE Account',value:'NE'},
	{label:'NRO Account',value:'NO'}
]

export const ALLOWED_MODULES = [
	{ levelName: 'Mint API', levelNo: 'allowAggregatorApi' },
	{ levelName: 'SSO', levelNo: 'allowSSOApi' },
	{ levelName: 'Factsheet', levelNo: 'allowFactSheetApi' },
	{ levelName: 'SDK', levelNo: 'allowSdkApi' }
]

export const KYC_REGISTERED = 'KYC Registered'
export const KYC_NOT_VERIFIED = 'KYC Not Verified'
export const CUSTOM_ALLOWED_DATES = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']

export const UPLOAD_FILE_FORMAT = [
	{ levelName: 'Investwell Format', levelNo: 'investwell', fileSize: '2', fileFormat:'xls/csv' },
	{ levelName: 'NJ Format', levelNo: 'njFormat', fileSize: '2', fileFormat:'xls/csv' },
	{ levelName: 'FundsIndia Format', levelNo: 'fundsIndiaFormat', fileSize: '2', fileFormat:'xls/csv' }
]

export const SERVER_TYPE = [
	{ label: 'Investlogic Cron Tab', value: 0 },
	{ label: 'API Scrapper Cron Tab', value: 1 }
]

export const TRAILING_RETURN_TYPES = [
	{label:"Lumpsum",value:'Lumpsum'},
	{label:"SIP",value:'SIP'}
]

export const TRAILING_RETURN_PERIODS = [
	{label:"Custom Time Periods",value:'customTimePeriod'},
	{label:"Calendar Year",value:'calenderYear'},
	{label:"Financial Year",value:'financialYear'}
]

export const RETURN_TYPE = [
	{label:"Quarterly",value:'Q'},
	{label:"Half Yearly",value:'H'},
	{label:"Yearly",value:'Y'}
]

export const LAST_YEARS = [
	{label:"1",value:1},
	{label:"2",value:2},
	{label:"3",value:3},
	{label:"5",value:5},
	{label:"7",value:7},
	{label:"10",value:10},
	{label:"15",value:15}
]

export const PERIOD_TYPES = [
	{label:"Days",value:'d',number : 30},
	{label:"Months",value:'m',number : 12},
	{label:"Years",value:'y', number : 25}
]

export const TRAILING_RETURNS_PERIOD_SECTIONS = [
    { label: 'Period 1', value: 'period1' },
    { label: 'Period 2', value: 'period2' },
    { label: 'Period 3', value: 'period3' },
    { label: 'Period 4', value: 'period4' },
    { label: 'Period 5', value: 'period5' },
    { label: 'Period 6', value: 'period6' },
    { label: 'Period 7', value: 'period7' },
    { label: 'Period 8', value: 'period8' },
    { label: 'Period 9', value: 'period9' },
    { label: 'Period 10', value: 'period10' }
];

export const NOMINEE_RELATION = [
	{label: 'Aunt', value:'Aunt'},
	{label: 'Brother-in-law', value:'Brother-in-law'},
	{label: 'Brother', value:'Brother'},
	{label: 'Daughter', value:'Daughter'},
	{label: 'Daughter-in-law', value:'Daughter-in-law'},
	{label: 'Father', value:'Father'},
	{label: 'Father-in-law', value:'Father-in-law'},
	{label: 'Grand Daughter', value:'Grand daughter'},
	{label: 'Grand Father', value:'Grand father'},
	{label: 'Grand Mother', value:'Grand mother'},
	{label: 'Grand Son', value:'Grand son'},
	{label: 'Mother-in-law', value:'Mother-in-law'},
	{label: 'Mother', value:'Mother'},
	{label: 'Nephew', value:'Nephew'},
	{label: 'Niece', value:'Niece'},
	{label: 'Sister', value:'Sister'},
	{label: 'Sister-in-law', value:'Sister-in-law'},
	{label: 'Son', value:'Son'},
	{label: 'Son-in-law', value:'Son-in-law'},
	{label: 'Spouse', value:'Spouse'},
	{label: 'Uncle', value:'Uncle'},
	{label: 'Others', value:'Others'}
]
export const HEATMAP_QUARTILE=[
{bgcolor:'greenBgcolor',value:'A'},
{bgcolor:'yellowBgcolor',value:'B'},
{bgcolor:'pinkBgcolor',value:'C'},
{bgcolor:'redBgcolor',value:'D'},
{bgcolor:'greyBgcolor',value:null}
]

export const USER_DEFINED_SECURITIES_TABS = [
	{label:'Price History', value: 'priceHistory'},
	{label:'Securities', value: 'securities'},
	{label:'Category', value:'category'}
]

export const CREATE_TRANSACTION_SECURITY_TYPE = [
	{label:'Listed Securities', value: 'listedSecurities'},
	{label:'User Defined Securities', value: 'userDefinesSecurities'}
]

export const CREATE_TXN_TYPES = [
	{label:'Purchase', value : 'purchase'},
	{label:'Sell', value : 'sell'},
	{label:'Payout', value : 'payout'}
]

export const ACCOUNT_RELATION_CONSTANTS = [
	{ label: 'Guardian Account', value: 'G' },
	{ label: 'Minor Account', value: 'M' },
	{ label: 'Minor under Guardian account', value: 'U' }
]


//admin/index

export const LEFT_SIDEBAR_TAB_OPTION ={'searchsoa': [
],
'searchrejection': [
],
'systemdata' :[
    {label:'Funds & Schemes', url:'/admin/systemData/fundsAndSchemes', value:1001},
    //{label:'FD & Other Assets',url:"/admin/systemData/fdAndOtherAssets",value:1002},
    {label:'NSE, BSE, MFU Schemes',url:"/admin/systemData/completeSchemeDetails",value:1003},
    {label:'Corporate Actions',url:"/admin/systemData/corporateActions",value:1004},
],
'report' :[
],
'settings' :[
    {label:'Delete Broker', url:'/admin/settings/deleteBroker', value:1501}
],
'analytics' :[
    {label:'One View Report', url:'/admin/report/oneViewReport', value:1301},
    {label:'File Status', url:'/admin/analytics/fileStatus', value:1302},
    {label:'Cron Info', url:'/admin/cronInfo', value:1303},
    {label:'Cron History', url:'/admin/cronHistory', value:1304},
    {label:'Cron Tab', url:'/admin/analytics/cronTab', value:1305},
    { label: 'Mobile App Release Status', url: '/admin/analytics/mobileAppStatus', value: 1306 }
],
'dataManagement': [
    {label:'Email Parsing Logs',url:"/admin/emailLog",value:2201},
    {label:'SOA Download',url:"/admin/SOADownload",value:2202},
    {label:'File Import History',url:"/admin/importHistory",value:2203}
],
'createCredential': [
    {label:'API',url:"/admin/apiCredential",value:1801},
    {label:'Sub User',url:"/admin/subUserCredential",value:1802},
],
};

export const LEFT_SIDEBAR_TAB_PANEL_LABEL ={'searchsoa':{label:'Search SOA',url:"/admin/searchSoa",value:100},
    'searchrejection':{label:'Search Rejection',url:"/admin/searchRejection",value:200},
    'aumreconcilation':{label:'AUM Reconciliation',url:"/admin/aumReconciliation",value:800},
    'systemdata':{label:'System Data',url:"javascript:void(0);",value:1000},
    'ifalookup':{label:'IFA Lookup',url:"/admin/ifaLookup",value:300},
    // 'duplicateTxn':{label:'Duplicate Transactions',url:"/admin/duplicateTxns",value:900},
    'misMatch':{label:'Rejections',url:"/admin/mismatchRejections/transactionRejection",value:1100},
    'handleException':{label:'Handle Exception',url:"/admin/handleException",value:1200},
    'analytics':{label:'Analytics',url:"javascript:void(0);",value:1300},
    'arnMapping':{label:'ARN Mapping',url:"/admin/arnMapping",value:1400},
    'settings':{label:'Settings',url:"javascript:void(0);",value:1500},
    'taskManagement':{label:'Task Management',url:"/admin/taskManagement",value:1600},
    'searchFolio':{label:'Search Folio',url:"/admin/searchFolio",value:1700},
    'orders':{label:'Orders',url:"/admin/orders",value:2000},
    // 'sipReconciliation':{label:'SIP Reconciliation',url:"/admin/sipReconciliation",value:2100},
    'dataManagement':{label:'Data Management',url:"javascript:void(0);",value:2200},
    'brokerageDataReport':{label:'Brokerage Data Report',url:"/admin/brokerageDataReport",value:2300},
    'dataDeletionModule':{label:'Data Deletion Module',url:"/admin/dataDeletionModule",value:2400},
    'createCredential':{label:'Create Credentials',url:"javascript:void(0);",value:1800},
    'loginHistory' : {label:'Login History',url:"/admin/loginHistory",value:2500}
}

export const TABS_LIST_LABEL ={'ifasignup':{label:'IFA Sign Up',url:"javascript:void(0);",value:400},
'ifaregistration':{label:'IFA Registration',url:"javascript:void(0);",value:500},
'zippassword':{label:'Rta Zip Password',url:"javascript:void(0);",value:600},
'arn':{label:'ARN',url:"javascript:void(0);",value:900},
'levelinfo':{label:'Level & Info',url:"javascript:void(0);",value:700},
'preferences':{label:'IFA Preferences',url:"javascript:void(0);",value:800},
}







export const PAGES_TITLES = [ {url:'client/overview',title:"Reports"},{url:'client/dashboard',title:"Dashboard"},
	{url:'client/goal',title:"User Goal"},{url:'client/goal/assingFolioToGoal',title:"Assing Folio To Goal"},
	  {url:'client/transactions',title:"Transactions"},
	  {url:'client/newInvestment',title:"Invest Online"},
	  {url:'client/additionalInvestment',title:"Invest Online"},
	  {url:'client/Cart',title:"Invest Online"},
	  {url:'client/myDocuments',title:"My Documents"},
	  {url:'client/mySystematicTransactions',title:"My Systematic Transactions"},
	  {url:'client/folioLookup',title:"Folio Lookup"},
	  {url:'client/Reports',title:"Reports"}
  ]