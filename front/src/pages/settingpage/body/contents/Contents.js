import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import { phoneDataUpdate, phoneDataFetchAsync } from '../../../../modules/phoneData';
import { inputValidCheck } from '../../../../utils/propertyInfo';
// import * as restAPI from '../../../../utils/api';
// import { inputValidCheck } from '../../../../utils/propertyInfo';
import Tables from './Tables';

const StyledContents = styled.div`
    width:100%;
    box-sizing:border-box;

    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;

    display:flex;
    justify-content:center;
    align-items:center;
`;

const ContentsBox= styled.div`
    width:100%;
    height:100%;
`;

const ContentsTop = styled.div`
    position:relative;
    height:50px;
    display:flex;
    width:100%;

    border-bottom: solid 1px #707070;; 
`;
const ContentsTopName = styled.div`
    font-size:19px;
    font-weight:bold;
`;
const ContentsTopButtons = styled.div`
    /* padding-top:13px; */
    padding-right:13px;
    /* padding-left:13px; */
    padding-bottom: 13px;
    height:35px;
    display:flex;

    font-size:15px;
    font-weight:500; 
`;

const ContentsBottom = styled.form`
    width:100%;
    display:flex;
    padding-top:7px;
`;

// 필수 입력 항목이 아닌것들
const notRequired = [
    "battery", "screen_size", "storage"
];
const commaValues = [
    "shipping_price", "battery",  "storage"
]

//리스트가 1개 이상인지 확인하는 함수
function isFilledList(list){
    // console.log(list.length);
    if(list.length > 0)
        return true;
    else   
        return false;
}

function Contents(){
    console.log("contents!!"); 
    const dispatch = useDispatch();
    const {refData, dataChangeList, rows, error,loading} = useSelector( state =>({
        refData: state.phoneData.refData,
        dataChangeList: state.phoneData.dataChangeList,
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    },[]);

    //NOTE - 추가버튼 클릭시
    const handleAdd =  ()=>{
        dispatch(phoneDataUpdate.Add());
    };

    //NOTE - 적용버튼 클릭시
    const handleApply = () =>{
        
        const addList = dataChangeList.dataAddList;
        const deleteList = dataChangeList.datadDeleteList;
        const updateList = dataChangeList.dataUpdateList;
        // 만약 추가버튼을 눌러서 추가한 데이터가 있으면
        if( isFilledList(addList) === true){
            //adlist 모두 순환
            addList.forEach( addedRowId => {
                const rowIdx = rows.findIndex(originalRow=>originalRow.id === addedRowId);
                // const row = rows.find(ele => ele.id === addedRowId);
                // row.foreach(val=>console.log(val));
                // console.log(row);
                // 추가된 row를 맨 앞 id를 자르고서 키와 값을 rowEntires에 넣음
                const rowEntries = Object.entries(rows[rowIdx]).splice(1);

                // if( notRequired.every(key => key !== value[0]) 
                // && inputValidCheck[colIdx].reg.test(value[1]) === false // 정규식을 통과 못헀거나 빈칸일 경우(
                // || value[1] === "" )){

                    rowEntries.some((ele,colIdx) => {
                        const key = ele[0];
                        const val = ele[1]
                        // 빈칸이거나 정규식을 통과하지 못했을 때
                        if( ( val === null || val === ""|| val === " "|| inputValidCheck[colIdx].reg.test(val)===false ) 
                                && notRequired.every(colName => colName !== key )) {
                            refData[rowIdx].refs[colIdx].current.focus();
                            return true;
                        }
                        else return false;
                    })
                
                
            });// addList.forEach() 끝
        }
    };

    if( loading ) return null;
    if( error ) return <div>에러 발생 자세한건 로그 참조</div>;
    if( !rows ) return <div>서버로부터 데이터 로딩 실패!</div>;
    
    return(
        <StyledContents className="contents">
            <ContentsBox>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                </ContentsTop>
                <ContentsBottom>
                    <ContentsTopButtons>
                        <CButton onClick={ handleAdd } width="60px" height="40px" font_size="13px" font_weight="bold" border>추가</CButton>
                        <CButton onClick={ handleApply } width="60px" height="40px" font_size="13px" font_weight="bold" border>적용</CButton>
                    </ContentsTopButtons>
                    {!loading && !error && <Tables/>}
                </ContentsBottom>
            </ContentsBox>
        </StyledContents>
    );
}

export default React.memo(Contents);