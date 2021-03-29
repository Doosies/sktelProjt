import React, { useCallback, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import { phoneDataUpdate, phoneDataFetchAsync, phoneDataChangedList } from '../../../../modules/phoneData';
import * as RESTAPI from '../../../../utils/api';
import { columnPhoneInfo, inputValidCheck } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';

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

const requiredInputValue = [
    "model_name", "machine_name", "shipping_price", "maker", "created",
]
// 필수 입력 항목
const notRequiredInputValue = [
    "battery", "screen_size", "storage",
];
const commaValues = [
    "shipping_price", "battery",  "storage"
]

//리스트가 1개 이상인지 확인하는 함수
function isFilledList(list){
    if(list !== null)
        if(list.length >= 1 )
            return true;
        else   
            return false;
}

function Contents(){
    console.log("contents!!"); 
    const dispatch = useDispatch();
    const {dataChangeList, rows, error,loading} = useSelector( state =>({
        dataChangeList: state.phoneData.dataChangeList,
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    //focus 이동을 위한 refs
    const refs = useRef(new Array(rows.length).fill());

    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //NOTE - 추가버튼 클릭시
    const handleAdd =  ()=>{
        dispatch(phoneDataUpdate.Add());
    };

    //NOTE - 적용버튼 클릭시
    const handleApply = async() =>{
        const addList = dataChangeList.dataAddList;
        const deleteList = dataChangeList.dataDeleteList;
        const updateList = dataChangeList.dataUpdateList;
        // 만약 추가버튼을 눌러서 추가한 데이터가 있으면
        const canSendAddData =  isFilledList(addList) && !addList.some( row => {
            const rowIdx = rows.findIndex(originalRow=>originalRow.id === row.id);
            // 추가된 row를 맨 앞 id를 자르고서 키와 값을 rowEntires에 넣음
            const rowEntries = Object.entries(rows[rowIdx]).splice(1);
            // 빈칸이 있거나 정규식을 통과 못하면 TRUE 아니면 FALSE
            return rowEntries.some((ele,colIdx) => {
                const key = ele[0];
                const val = commaValues.some(val=>val === key) 
                            ? utils.uncomma(ele[1]) 
                            : ele[1];
                // 필수값인지 확인함. 맞을시 그 값을 포커싱해줌
                return requiredInputValue.some(colName =>{
                    if( colName === key && (( !val || val === " " || columnPhoneInfo[colIdx].reg.test(val)===false ))){
                        refs.current[rowIdx].children[colIdx+1].children[0].focus();
                        return true;
                    }else return false;
                });
            });
        });
        
        // 추가, 제거, 수정 중 하나의 리스트라도 차있어야 전송함.
        if( canSendAddData || (isFilledList(deleteList) || isFilledList(updateList))){
            const response = await RESTAPI.patchPhoneInfo({addList,deleteList,updateList});
            if( response === "ok"){
                //관련 리스트를 전부 비움
                dispatch(phoneDataChangedList.Init());
                //데이터를 다시 받아옴.
                dispatch(phoneDataFetchAsync());
            }else {
                alert("데이터 전송에 실패했습니다.");
            }
        }
    };

    if( loading ) return null;
    if( error ) return <div>에러 발생 자세한건 로그 참조</div>;
    if( !rows ) return <div>서버로부터 데이터 로딩 실패!</div>;
    

    return(
        <StyledContents className="contents" onKeyDown={(e)=>console.log(e)}>
            <ContentsBox>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                </ContentsTop>
                <ContentsBottom>
                    <ContentsTopButtons>
                        <CButton onClick={ handleAdd } width="60px" height="40px" font_size="13px" font_weight="bold" border>추가</CButton>
                        <CButton onClick={ handleApply } width="60px" height="40px" font_size="13px" font_weight="bold" border>적용</CButton>
                    </ContentsTopButtons>
                    {!loading && !error && <Tables  ref={refs}/>}
                    {/* {!loading && !error && <Tables/>} */}
                </ContentsBottom>
            </ContentsBox>
        </StyledContents>
    );
}

export default React.memo(Contents)