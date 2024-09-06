export const LEFT_SIDEBAR_MAIN_TAB = {
	'level1':"Search SOA",
	'level2':"Search Rejection"
}

export const SOA_LIST = [
	{label:"Search By Folio Number",value:1,},
	{label:"Search By Folio ID",value:2}
]
export const USER_TYPE = [
	{label:"Broker",value:'broker', levelNo:1},
	{label:"Relationship Manager",value:'relationshipManager', levelNo:8},
	{label:"Sub Broker",value:'subBroker', levelNo:10}
]

export const GET_TXN_TYPE = [
	{label:"Name",value:"name", indexVal: 1},
	{label:"Folio Number",value:"folioNo", indexVal: 2}
]
export const AUMREC_LIST = [
	{label:"Cams",value:'c',},
	{label:"Karvy",value:'k'},
	// {label:"Franklin",value:'f'},
	// {label:"Sundaram",value:'s'}
]
export const FOUND_LIST = [
	{label:'Search Scheme', value:1},
	{label:'Search Fund', value:2}
]

export const THEMES_LIST = [
	{label:"1",value:1},
	{label:"2",value:2},
	{label:"3",value:3},
	{label:"4",value:4},
	{label:"5",value:5},
	{label:"6",value:6},
	{label:"7",value:7},
	{label:"8",value:8},
	{label:"9",value:9},
	{label:"10",value:10}
]
export const TXN_TYPES = [
	{label: 'Sell', value:"sell"},
	{label: 'Purchase', value:"purchase"},
	{label: 'Payout', value:"payout"}
]

export const HANDLE_EXCEPTION_LIST = [
	{label:"Transmission",value:"transmission", indexVal: 1},
	{label:"Consolidation",value:"consolidation", indexVal: 2}
]

export const REGISTRAR = [
	 {label:"All",value:null},
	 {label:"Cams",value:"C"},
     {label:"Karvy",value:"K"}
]

export const ASSET_TYPE = [
	{ label : 'Fixed Deposit', value : 'FD' }
]

export const FDASSETS_TABS = [
	{label : 'Fixed Deposit', value: 0},
	//{label : 'Other Assets', value: 1}
]

export const TRANSACTION_TYPES = [
	{label:"PURCHASE",value:0},
	{label:"SELL",value:1},
	{label:"DIV_PAYOUT",value:2}
]
export const AUM_RECONCILIATION_OPTIONS = [
	{label:"Folio No",value:0},
	{label:"Fund",value:1},
	{label:"Investor",value:2},
	{label:"Schemes",value:3},
]

export const IS_COMPLETED_OPTIONS =[
    {label:"Not Completed",value:0},
    {label:"Completed",value:1},
   // {label:"Pending",value:2}

]

export const SOA_STATE = [
	{label:'Queued For Processing',value:'0'},
	{label:'Completed',value:'1'},
	{label:'Processing',value:'2'},
	{label:'Failed',value:'-1'},	
]

export const MISMATCH_REJECTION_TABS = [
	{label:'Transaction Rejection',value:0, type:'transactionRejection'},
	{label:'Brokerage Rejection',value:1, type: 'brokerageRejection'},
	{label:'Scheme Mapping',value:2, type: 'schemeMapping'},
	{label:'SIP Rejection',value:3, type: 'sipRejection'},
	{label: 'Transaction Rejection Mapping', value: 4, type: 'transactionRejectionMapping'},
	{label:'Scheme code Rejection',value:5, type: 'schemeCodeRejection'}
]

export const MISMATCH_FOLIOS_IS_COMPLETED_OPTIONS =[
    {label:"All",value:""},
    {label:"Failed",value:-1,colorValue:"redColor"},
    {label:"Pending",value:0},
   	{label:"Completed",value:1,colorValue:"greenColor"},
   	{label:"Queued",value:2},
   	{label:"In Progress",value:3}
]

export const SIP_RECO_GROUP_BY_LIST = [
	{levelName:"Fund",levelNo:1001},
    {levelName:"ARN",levelNo:1011},
    {levelName:"Folio",levelNo:1010}
]

export const MY_ORDERS_STATUS =[
    { label:"All", value: "" },
    { label:"Successful", value: "success" },
    { label:"Failed", value: "failed" }
]

export const EMAIL_LOG_STATUS_COLORS={
	1 : "yellowColor",
	2 : "redColor",
	3 : "yellowColor",
	4 : "yellowColor",
	5 : "redColor",
	6 : "redColor",
	7 : "greenColor",
	8 : "redColor",
}

export const SCHEDULE_SUBSCRPTION_OPTION = [
	{ label: 'Transaction', value: 'transaction', scheduleNo: 307},
	{ label: 'Folio Master', value: 'folioMaster', scheduleNo: 311},
	{ label: 'SIP Registration', value: 'sipReg', scheduleNo: 313},
	{ label: 'SIP Termination', value: 'sipTerm', scheduleNo: 331}
]

export const FOLIO_FOUND = [
	{ label: 'is Manual Entry', value: 'isManualEntry'},
	{ label: 'Soft Ignored', value: 'softIgnored'},
	{ label: 'Hard Ignored', value: 'hardIgnored'},
]

export const HARD_SOFT_IGNORED = [
	{label:"Yes",value:1,},
	{label:"No",value:0}
]

export const SCHEDULE_CHECK_TASK_LIST = [
	{label:"Transaction",value:21,},
	{label:"Folio Master",value:22},
	{label:"SIP Registration",value:23},
	{label:"SIP Termination",value:24},
	{label:"Kyc verified",value:26},
	{label:"Kyc Not Verified",value:27},
]

export const EXCHANGE_LIST = [
	{label:"All",value:0},
	{label:'NSE',value:1},
	{label:'BSE',value:2},
	{label:'MFU',value:3},
]

export const ORDER_TXNS_TYPES = [
	 {label:"Purchase",value:'NRP', indexVal: 1},
	 {label:"Switch In",value:'SWI', indexVal: 2},
     {label:"Switch Out",value:'SWO', indexVal: 3},
     {label:"SIP",value:'SIP', indexVal: 4},
     {label:"STP",value:'STP', indexVal: 5},
     {label:"Redemption",value:'NRS', indexVal: 6},
     {label:"SWP",value:'SWP', indexVal: 7},
     
     
]

export const ONE_VIEW_REPORT_CREDENTIAL_STATUS =[
		{label:"Failure",value:-1},
		{label:"Not Verified",value:0},
		{label:"Success",value:1},
		{label:"Not Available",value:2},
]

export const IFA_LOOKUP_SEARCH_OPTIONS = [
	{label:"Name, Domain, BID",value: 'searchKey', placeHolder: 'Name, Domain, BID'},
	{label:"Email ID",value: 'email', placeHolder: 'Email ID'},
	{label:"Mobile No.",value: 'phone', placeHolder: 'Mobile No'},
	{label:"ARN No.",value: 'arnNo', placeHolder: 'ARN-No'},
]
export const FILE_ORDER_STATUS_COLORS =[
	{'0':'redColor'},
	{'1':'greenColor'},
]

export const CHECKBOX_CAMS_TASK_ID = [
	1,2,3,4,5,7,8,9,10,11,33,41,47,48
]

export const CHECKBOX_KARVY_TASK_ID=[
	1,3,4,5,7,33,41,48
]

export const COMBINED_TASK_ID=[
	7
]

export const CHECKBOX_TASK_ID_BROKERAGE_PAYOUT=[
	7,8,9,10,11
]
export const MISMATCH_TYPES = [
	{levelName:'Custom',levelNo:1},
	{levelName:'Folio Found',levelNo:2},
	{levelName:'Folio not found with balance',levelNo:3},
	{levelName:'Folio not found with 0 balance',levelNo:4},
	{levelName:'Folio master',levelNo:5},

]

export const CREATE_CREDENTAIL_APIS = [
	{name:'apiCredential',createApiName:'aggregatorUsers/createAggregatorUser',deleteApiName:'aggregatorUsers/deleteAggregatorUser'},
	{name:'subUserCredential',createApiName:'subUsers/createSubUser',deleteApiName:'subUsers/deleteSubUser'}
]
export const CRON_TYPES = {
	'scrapperCron': 'Scrapper CRONs',
	'nodeCron': 'Investlogic CRONs'
}
export const FILE_TYPE = [
	{ levelName: 'DBF', levelNo: 0 },
	{ levelName: 'CSV', levelNo: 1 }
]

export const RECEIVED_STATUS = [
	{label:"All",value:null},
	{label:"Not Received",value:0},
	{label:"Received",value:1}
]

export const VIEW_TYPE_SCREEN_XLS =[
	{label:"On Screen", value:'onScreen' ,method:'view'},
	{label: "XLS", value: "xls",method:'export' }
]

export default LEFT_SIDEBAR_MAIN_TAB;
