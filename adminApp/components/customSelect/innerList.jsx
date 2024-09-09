import React, { useEffect, useMemo } from "react";

const CustomSelectInnerList = (props) => {

  useEffect(() => {
    const isEmptySubCategory = props.tempDataStore.subCategory && Object.entries(props.tempDataStore.subCategory).some(([key, value]) => key === props.getParentKey && value.length === 0);
    if (props.subCategoryListArray && isEmptySubCategory && props.isSelected) {
        props.subCategoryListArray.map((obj) => {
          props.selectChildOption(obj)
      })
    }
  }, [props.tempDataStore && props.tempDataStore.subCategory])

  const createInnerCategoryList = useMemo(() => {
    const tempDataStore = props.tempDataStore || {}
    
    return props.subCategoryListArray && props.subCategoryListArray.map((obj, index) => {
      let isChildSelected = false
      if (tempDataStore.subCategory && tempDataStore.subCategory[obj.AUMObjective] && tempDataStore.subCategory[obj.AUMObjective].includes(obj.objectiveid)) {
        isChildSelected = true
      }

      return (
        <li
          key={index}
          label={obj[props.subCategoryLabel]}
          value={obj[props.subCategoryValue]}
          onClick={() => props.selectChildOption(obj)}
        >
          <span className="customCheckBox mLeft30">
            <input
              type="checkbox"
              checked={isChildSelected}
              name="isSelected"
            />
            <span></span>
          </span>
          <span className="mLeft30">{obj[props.subCategoryLabel] || obj[props.subCategoryValue]}</span>
        </li>
      );
    });
  }, [props.subCategoryListArray, props.tempDataStore, props.subCategoryLabel, props.subCategoryValue, props.selectChildOption])

  return (
    <ul className="brdrBtm">
      {createInnerCategoryList}
    </ul>
  )
}

export default CustomSelectInnerList