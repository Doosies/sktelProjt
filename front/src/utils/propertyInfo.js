
//핸드폰 정보 수정의 column정보
// export const columnPhoneInfo = [
    // {name:"기기명", width:"200px", colName:"model_name", textalign:"left"},
    // {name:"모델명", width:"180px", colName:"machine_name", textalign:"left"},
    // {name:"출고가", width:"70px", colName:"shipping_price", textalign:"right"},
    // {name:"브랜드", width:"100px", colName:"maker", textalign:"center"},
    // {name:"출시일", width:"100px", colName:"created", textalign:"center"},
    // {name:"배터리 용량", width:"80px", colName:"battery", textalign:"right"},
    // {name:"스크린 사이즈", width:"100px", colName:"screen_size", textalign:"right"},
    // {name:"저장 용량", width:"100px", colName:"storage", textalign:"right"},
// ];

export const columnPhoneInfo = [
    // 기기명
    {
        name:"기기명", width:"200px", colName:"model_name", textalign:"left",
        deleteWord:/^ +/g,
        reg:/^/g,
        error:`값이 공백입니다. 다시 입력해주세요`,
        beforValue:'',
    },
    // 모델명
    {
        name:"모델명", width:"180px", colName:"machine_name", textalign:"left",
        deleteWord:/^ +/g,
        reg:/^/g,
        error:`값이 공백입니다. 다시 입력해주세요`,
        beforValue:'',
    },
    // 출고가
    {
        name:"출고가", width:"70px", colName:"shipping_price", textalign:"right",
        deleteWord:/[^\d]+/g,
        reg:/^(0|[1-9][0-9]+|[1-9])$/,
        error:`
            숫자의 맨 앞에 0이 있거나 현재 값이 공백입니다.
            가격을 다시 지정 해주세요.\n
        `,
        beforValue: '',
    },
    // 브랜드
    {
        name:"브랜드", width:"100px", colName:"maker", textalign:"center",
        deleteWord:/^ +/g,
        reg:/^(samsung|lg|apple|etc)$/,
        error:`
            공백이 존재하거나 제조사 형식이 잘못되었습니다..
            apple, samsung, lg, etc 네개중 하나로 설정해주세요\n
        `,
        beforValue: '',
    },
    // 출시일
    {
        name:"출시일", width:"100px", colName:"created", textalign:"center",
        deleteWord:/^ +/g,
        reg:/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        error:`
            공백이 존재하거나 날짜값의 형식이 잘못 되었습니다.
            2000-01-01 과 같은 형식으로 다시 지정해주세요\n
        `,
        beforValue: '',
    },
    // 배터리
    {
        name:"배터리 용량", width:"85px", colName:"battery", textalign:"right",
        deleteWord:/[^\d]+/g,
        reg:/^[\d]{1,10}$|\s{0,}/g,
        error:`숫자가 아닌 값이 입력되었습니다. 확인해주세요.`,
        beforValue:'',
    },
    // 스크린 사이즈
    {
        name:"스크린 사이즈", width:"100px", colName:"screen_size", textalign:"right",
        deleteWord:/[^\d]+/g,
        reg:/(^[1-9]{1}[[1-9]{0,1}]+$)|(^\d{1,}\.\d{0,2}$)|^[1-9]$|\s{0,}/,
        error:`
            입력된 값이 숫자가 아니거나.\n
            소수점 둘째 자리 이상 입력되었습니다.\n
            다시 확인해주세요
        `,
        beforValue:'',
    },
    // 저장용량
    {
        name:"저장 용량", width:"100px", colName:"storage", textalign:"right",
        deleteWord:/[^\d]+/g,
        reg:/^[\d]{1,10}$|\s{0,}/g,
        error:`숫자가 아닌 값이 입력되었습니다. 확인해주세요.`,
        beforValue:'',
    },
];