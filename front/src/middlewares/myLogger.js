const myLogger = store => next => action =>{
    console.log(action);//액션을 호출
    const result = next(action);// 다음 미들웨어 또는 리듀서에게 액션을 전달함
    console.log('\t', store.getState()); // '\t' 는 탭 문자 입니다.
    return result;// 여기서 반환하는 값은 dispatch(action)의 결과물.
}

export default myLogger;