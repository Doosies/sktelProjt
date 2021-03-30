
export function inputNumberFormat(value) {
    return comma(uncomma(value));
}
export function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
export function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}


//리스트가 1개 이상인지 확인하는 함수
export function isFilledList(list){
    if(list !== null)
        if(list.length >= 1 )
            return true;
        else   
            return false;
}