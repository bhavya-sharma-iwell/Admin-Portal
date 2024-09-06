export const IMPORT_REJ_REASONS = {
  MISSING_FIELD: 'Missing Field',
  INVALID_SCEME_ID: 'Invalid Scheme Id',
  TXN_TYPE_MISMATCHED: 'Txn Type Mismatched',
  FOLIO_WISE_MISMATCHED: 'Folio Not Found',
  INVALID_SOURCE_OR_TARGET_SCHEME_ID : 'Invalid Source or Target Scheme Id'
}

export const MISMATCH_BY =
		[
			{
				label:"Scheme Wise Mismatch",apiEndPoint:"/api/admin/importRejections/getMismatchedSchemes",
				tableCustomData:[{key:"Cams Code",value:"camsCode"},{key:"Scheme Name",value:"schemeName"},],
				source:IMPORT_REJ_REASONS.INVALID_SCEME_ID,
			},

			{
				label:"Txns Type Wise Mismatch",apiEndPoint:"/api/admin/importRejections/getMismatchedTxns",
				tableCustomData:[{key:"Transaction Type",value:"txnType", metatitle : 'adminTxnRejcRows'},{key:"Remarks",value:"orgTxnType", 	styleClass : 'linkInTable', metatitle : 'adminTxnRejcRows'}, 
				{key:"Group Count",value:"groupCount", metatitle : 'adminTxnRejcRows'},{key:"Latest Created At",value:"latestCreatedAt", styleClass :'txtNotBreak', isDateFlag:true, metatitle : 'adminTxnRejcRows'},],
				source:IMPORT_REJ_REASONS.TXN_TYPE_MISMATCHED
			},
			{
				label:"Folio Wise Mismatch",apiEndPoint:"/api/admin/importRejections/getSipFolioNotFound",
				tableCustomData:[{key:"Folio No ",value:"folioNoSource"},{key:"Scheme Name",value:"schemeNameSource"},
				{key:"Folio No Dest",value:"folioNoDest"},{key:"Scheme Name Dest",value:"schemeNameDest"}],
				source:IMPORT_REJ_REASONS.FOLIO_WISE_MISMATCHED
			},
		]

export const BROKERAGE_REJCTION_TYPE = [
	{label: 'Folio Not Found', value: 'folioNotFound'},
	{label: 'Scheme Not Found' , value: 'schemeNotFound'},
]