import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import { phoneDataUpdate, phoneDataFetchAsync } from '../../../../modules/phoneData';
import { patchPhoneInfo } from '../../../../utils/api';
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

//리스트가 1개 이상인지 확인하는 함수
function isFilledList(list){
    if(list.length > 0)
        return true;
    else   
        return false;
}

function Contents(){
    const dispatch = useDispatch();
    const {dataAddList, rows, error,loading} = useSelector( state =>({
        dataAddList: state.phoneData.dataChangeList.dataAddList,
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
    useEffect(()=>{
        dispatch(phoneDataFetchAsync());
    },[dispatch]);

    //NOTE - 추가버튼 클릭시
    const handleAdd =  ()=>{
        dispatch(phoneDataUpdate.Add());
    };

    //NOTE - 적용버튼 클릭시
    const handleApply = () =>{
        // 만약 추가버튼을 눌러서 추가한 데이터가 있으면
        if( isFilledList(dataAddList)){
            dataAddList.forEach(element => {
                // console.log(element);
            });
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
                    <Tables/>
                </ContentsBottom>
            </ContentsBox>
        </StyledContents>
    );
}

export default React.memo(Contents);