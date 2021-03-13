
//핸드폰 정보 수정의 column정보
export const columnPhoneInfo = [
    {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
    {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
    {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
    {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
    {name:"출시일", width:"100px", colname:"created", textalign:"center"},
    {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
    {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
    {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
];

export const inputValidCheck = [
    // 기기명
    {
        deleteWord:/^ +/g,
        reg:/^/g,
        error:``,
        beforValue:'',
    },
    // 모델명
    {
        deleteWord:/^ +/g,
        reg:/^/g,
        error:``,
        beforValue:'',
    },
    // 출고가
    {
        // colName:col3,
        // deleteWord:/[^\d]+/g,
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
        deleteWord:'',
        reg:/^(samsung|lg|apple|etc)$/,
        error:`
            공백이 존재하거나 제조사 형식이 잘못되었습니다..
            apple, samsung, lg, etc 네개중 하나로 설정해주세요\n
        `,
        beforValue: '',
    },
    // 출시일
    {
        deleteWord:'',
        reg:/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        error:`
            공백이 존재하거나 날짜값의 형식이 잘못 되었습니다.
            2000-01-01 과 같은 형식으로 다시 지정해주세요\n
        `,
        beforValue: '',
    },
    // 배터리
    {
        deleteWord:/[^\d]+/g,
        reg:/^/g,
        error:``,
        beforValue:'',
    },
    // 스크린 사이즈
    {
        deleteWord:/^ +/g,
        reg:/^/g,
        error:``,
        beforValue:'',
    },
    // 저장용량
    {
        deleteWord:/[^\d]+/g,
        reg:/^/g,
        error:``,
        beforValue:'',
    },
];