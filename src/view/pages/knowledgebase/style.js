import Styled from 'vue3-styled-components';

const KnowledgebaseTopWrap = Styled.div`
    .ninjadash_knowledgetop{
        text-align: center;
        padding: 65px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        box-shadow: 0 5px 20px ${({ theme }) => theme[theme.mainContent]['light-text']}10;
        @media only screen and (max-width: 575px){
            padding: 30px;
        }
        .ninjadash_knowledgetop__title{
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 25px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            @media only screen and (max-width: 575px){
                font-size: 24px;
            }
        }
        .ninjadash_knowledgetop__formInner{
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 690px;
            margin: 0 auto;
            background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
            box-shadow: 0 10px 10px ${({ theme }) => theme['light-color']}10;
            @media only screen and (max-width: 575px){
                flex-wrap: wrap;
                padding: 25px 15px;
            }
            .ant-form-item{
                margin-bottom: 0;
                @media only screen and (max-width: 575px){
                    width: 100%;
                }
            }
            .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
                height: 54px !important;
                border: 0 none !important;
            }
            .ant-select{
                min-width: 160px;
                .ant-select-arrow{
                    ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 30px;
                    @media only screen and (max-width: 575px){
                        top: 40%;
                    }
                }
            }
            .ant-select-selector{
                @media only screen and (max-width: 575px){
                    width: calc(100% - 22px);
                    position: relative;
                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 11px;
                    border-radius: 4px;
                    border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']} !important;
                    margin-bottom: 15px;
                }
                .ant-select-selection-search{

                    .ant-select-selection-search-input{
                        height: 54px;
                    }
                }
                .ant-select-selection-item{
                    font-size: 15px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')}
                    line-height: 54px !important;
                    ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme[theme.mainContent]['border-color-default']};
                    @media only screen and (max-width: 575px){
                        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0px solid ${({ theme }) =>
  theme[theme.mainContent]['border-color-default']};
                    }
                }
            }
            .ninjadash_search-input{
                width: 100%;
                .ant-form-item-control{
                    @media only screen and (max-width: 575px){
                        padding: 0 11px;
                    }
                }
                .ant-form-item-control-input{
                    font-size: 15px;
                    color: #868EAE;
                    height: 54px;
                    @media only screen and (max-width: 575px){
                        border-radius: 4px;
                        border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                        margin-bottom: 15px;
                    }
                }
                .ant-input{
                    line-height: 2;
                    border: 0 none;
										background: ${({ theme }) => theme[theme.mainContent]['white-background']};
										@media only screen and (max-width: 575px){
											line-height: normal;
										}
                    &:focus{
                        outline: none;
                        box-shadow: 0 0;
                    }
                }
            }
            .btn-search{
                font-size: 15px;
                height: 54px;
                border-radius: 0 4px 4px 0;
                border-radius: ${({ theme }) => (theme.rtl ? '4px 0 0 4px' : '0 4px 4px 0')}
                padding: 6.4px 27.7px;
                @media only screen and (max-width: 575px){
                    border-radius: 4px;
                }
            }
        }
    }
    .ninjadash_knowledgetop__popular--topics{
        margin-top: 22px;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin: -6px 0;
        }
        li{
            margin: 6px 0;
            @media only screen and (max-width: 379px){
                flex: 100%;
                width: 100%;
            }
            &:first-child{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 25px !important;
                @media only screen and (max-width: 379px){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px !important;
                }

            }
            &:not(:last-child){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
                @media only screen and (max-width: 379px){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
                }
            }
            a,
            span{
                font-size: 14px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
            }
            a{
                color: ${({ theme }) => theme[theme.mainContent]['light-gray-text']};
                transition: .35s;
                &:hover{
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    text-decoration: underline;
                }
            }
        }
    }
`;

const KnowledgebaseArticleWrap = Styled.div`
    background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
    padding: 6px 50px 50px 50px;
    border-radius: 10px;
    margin-top: 50px;
    margin-bottom: 30px;
    @media only screen and (max-width: 991px){
        padding: 6px 20px 50px 20px;
    }
    .knowledgebase-article-container{
        max-width: 1110px;
        margin: 0 auto;
        &.theme-2{
            max-width: 930px;
        }
    }
    .ninjadash_paginaion{
        margin: 18px 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media only screen and (max-width: 991px){
            margin: 18px 0 25px;
        }
        @media only screen and (max-width: 767px){
            flex-flow: column;
            margin: 18px 0 40px;
        }
        ul{
            @media only screen and (max-width: 767px){
                margin-bottom: 20px;
            }
            li{
                display: inline-block;
                &:not(:last-child){
                    margin-right: 8px;
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
                }
                span{
                    color: ${({ theme }) => theme[theme.mainContent]['light-gray-text']};
                }
                a{
                    font-size: 14px;
                    color: ${({ theme }) => theme[theme.mainContent]['light-gray-text']};
                    &.active{
                        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    }
                }
            }
            li + li{
                &:before{
                    font-family: FontAwesome;
                    margin-right: 8px;
                    content: '\f105';
                }
            }
        }
    }
    .sidebar-shade{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #10122130;
        z-index: -1;
        opacity: 0;
        visibility: hidden;
        &.show{
            z-index: 22;
            opacity: 1;
            visibility: visible;
        }
    }
`;

const ArticleTabWrap = Styled.div`
    margin-bottom: 10px
    &.ninjadash_article-tab{
        .ninjadash_article-tab__menu{
            margin-bottom: 35px;
            ul{
                display: flex;
                align-items: center;
                border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                li{
                    &:not(:last-child){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 36px;
                    }
                    a{
                        position: relative
                        display: block;
                        font-size: 16px;
                        font-weight: 500;
                        padding: 18px 0;
                        transition: .35s;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                        @media only screen and (max-width: 575px){
                            font-size: 14px;
                        }
                        &.active{
                            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                            &:after{
                                opacity: 1;
                                visibility: visible;
                            }
                        }
                        &:after{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0px;
                            bottom: -.5px;
                            width: 100%;
                            height: 1px;
                            content: "";
                            opacity: 0;
                            visibility: hidden;
                            background-color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                        }
                    }
                }
            }
        }
    }
`;

const ArticleTabContentWrap = Styled.div`
    .ninjadash_article-tab-signle{
        margin-bottom: 70px;
        .ninjadash_article-tab-signle__title{
            font-size: 22px;
            font-weight: 600;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        .ninjadash_article-tab-signle__list{
            li{
                a{
                    display: block;
                    font-size: 15px;
                    font-weight: 400;
                    margin-bottom: 12px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    &:hover{
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
            }
        }
        .btn-link{
            position: relative;
            margin-top: 16px;
            color: ${({ theme }) => theme['primary-color']};
            &:hover{
                &:after{
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                }
            }
            &:after{
                position: absolute;
                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0px;
                bottom: -6.5px;
                width: 0%;
                height: 1px;
                content: "";
                opacity: 0;
                visibility: visible;
                transition: .35s;
                z-index: 2;
                background-color: ${({ theme }) => theme['primary-color']};
            }
            i,
            span{
                margin-left: 10px;
                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
            }
        }
    }
`;

const PopularArticleWrap = Styled.div`
    padding-top: 65px;
    border-top: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
    .ninjadash_popular-article{
        .ninjadash_popular-article__title{
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 30px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        .ninjadash_popular-article__single{
            border-radius: 10px;
            padding: 28px 30px 30px 30px;
            margin-bottom: 30px;
            &:hover{
                .single-article-title,
                p{
                    opacity: 1;
                }
            }
            &.theme-primary{
                color: #fff;
                background-color: ${({ theme }) => theme['primary-color']};
            }
            &.theme-success{
                color: #fff;
                background-color: ${({ theme }) => theme['primary-color']};
            }
            &.theme-secondary{
                color: #fff;
                background-color: ${({ theme }) => theme['secondary-color']};
            }
            &.theme-warning{
                color: #fff;
                background-color: ${({ theme }) => theme['warning-color']};
            }
            &.theme-info{
                color: #fff;
                background-color: ${({ theme }) => theme['info-color']};
            }
            &.theme-danger{
                color: #fff;
                background-color: ${({ theme }) => theme['danger-color']};
            }
            .single-article-title{
                font-size: 15px;
                font-weight: 400;
                color: #fff;
                opacity: .6;
                transition:.3s;
                margin-bottom: 15px;
            }
            p{
                font-size: 22px;
                line-height: 1.36;
                opacity: .9;
                transition:.3s;
                font-weight: 600;
                margin-bottom: 24px;
            }
            .btn-link{
                font-size: 15px;
                font-weight: 500;
                color: #fff;
                opacity: .9;
                &:hover{
                    opacity: 1;
                }
                i,
                span{
                    ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px;

                }
            }
        }
        .ninjadash_popular-article__box{
            direction: ltr;
            margin: 0;
            @media only screen and (max-width: 899px){
                margin: 0;
            }
            .item{
                padding: 15px;
            }
            .ninjadash_popular-article__single {
                margin: 0;
                direction: ${({ theme }) => (theme.rtl ? 'rtl' : 'ltr')};
            }
        }
        .ant-masonry{
            margin: -15px;
        }
    }
`;

const CtaWrap = Styled.div`
    margin-top: 40px;
    .ninjadash_knowledgebase-cta{
        text-align: center;
        .ninjadash_knowledgebase-cta__title{
            font-size: 22px;
            font-weight: 600;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        p{
            font-size: 15px;
            margin-bottom: 30px;
            color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
        .btn-rqSubmit{
            font-size: 14px;
            font-weight: 500;
            padding: 0px 30.71px;
        }
    }
`;

const ArticleListWrap = Styled.div`
    .ninjadash_articlelist{
        border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        padding-bottom: 65px;
        margin-bottom: 45px;
    }
    .ninjadash_articlelist__single{
        display: flex;
        @media only screen and (max-width: 991px){
            flex-flow: column;
        }
        &:not(:last-child){
            margin-bottom: 55px;
            @media only screen and (max-width: 991px){
                margin-bottom: 30px
            }
        }
        .ninjadash_articlelist__single--left{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 100px;
            min-width: 260px;
            @media only screen and (max-width: 1199px){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
            }
            @media only screen and (max-width: 991px){
                margin-bottom: 12px;
                margin-right: 0;
            }
            .ninjadash_article-category-title{
							color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                @media only screen and (max-width: 1199px){
                    font-size: 1.2rem;
                }
            }
        }
    }
    .ninjadash_article-category-links{
        ul{
            display:  flex;
            justify-content: between;
            flex-wrap: wrap;
            li{
                flex: 0 0 44%;
                max-width: 285px;
                @media only screen and (max-width: 767px){
                    flex: 0 0 100%;
                    max-width: 100%;
                }
                &:not(:last-child){
                    margin-bottom: 15px;
                }

                &:nth-child(2n){
                    ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 68px;
                    @media only screen and (max-width: 767px){
                        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 0;
                    }
                }
                a{
                    font-size: 15px;
                    font-weight: 400;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    &:hover{
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
                .ant-collapse {
                    border: 0 none;
                    .ant-collapse-item{
                        border: 0 none
                    }
                    .ant-collapse-header{
                        padding: 0 0 0 18px !important;
                        padding: ${({ theme }) => (theme.rtl ? '0 18px 0 0' : '0 0 0 18px')} !important;
                        background-color:  ${({ theme }) => theme[theme.mainContent]['white-background']}!important;
                        .ant-collapse-arrow{
                            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0px;
                        }
                    }
                    .ant-collapse-content {
                        border: 0 none;
                        .ant-collapse-content-box{
                            padding: 14px 0 0 30px;
                            ul{
                                display: block;
                                li{
                                    &:nth-child(2n){
                                        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 0px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const SingleKnowledgeContent = Styled.div`
    display: flex;
    @media only screen and (max-width: 991px){
        display: block
    }
    .knowledge-sidebar-wrap {
        position: fixed;
        top: 64px;
        left: 0;
        width: 300px;
        height: 100vh;
        overflow-y: auto;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,.12549019607843137);
        transition: all .35s;
        z-index: 222;
        &.hide{
            transform: translateX(-300px);
        }
        &.show{
            transform: translateX(0px);
        }
        .knowledge-sidebar{
            width: 300px;
            height: 100vh;
            overflow-y: auto;
            background-color: #fff;
        }
        .trigger-close{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 15px;
            top: 15px;
        }
    }
`;

const SidebarNavWrap = Styled.div`
    min-width: 330px;
    height: fit-content;
    border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
    border-radius: 4px;
    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
    @media only screen and (max-width: 991px){
        border: 0 none;
    }
    .knowledge-sidebar{
        .knowledge-sidebar__title{
            font-size: 16px;
            font-weight: 500;
            padding: 18px 20px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        }
        ul{
            padding: 18px 20px 35px;
            li{
                &:not(:last-child){
                    margin-bottom: 18px;
                }
                a{
                    display: flex;
                    font-size: 16px;
                    font-weight: 500;
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    i,
                    svg,
                    img{
                        min-width: 14px;
                        margin-top: 4px;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
                    }
                }
            }
        }
        .submenu{
            display: none;
            padding: ${({ theme }) => (theme.rtl ? '0px 24px 0 0' : '0px 0 0 24px')};
            margin-top: 10px;
            position: relative;
            &.show{
                display: block;
            }
            &:after{
                position: absolute;
                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 24px;
                top: 0;
                width: 2px;
                height: 100%;
                content: "";
                background-color: ${({ theme }) => theme[theme.mainContent]['main-background-light']};
            }
            li{
                margin-bottom: 0 !important;
                a{
                    display: flex;
                    font-size: 15px;
                    font-weight: 400;
                    padding: ${({ theme }) => (theme.rtl ? '6px 22px 6px 0' : '6px 0 6px 22px')};
                    position: relative;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    &.active{
                        &:after{
                            opacity: 1;
                            visibility: visible;
                        }
                    }
                    &:after{
                        position: absolute;
                        ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0px;
                        top: 0;
                        width: 2px;
                        height: 100%;
                        content: "";
                        z-index: 2;
                        opacity: 0;
                        visibility: hidden;
                        background-color: ${({ theme }) => theme['primary-color']};
                    }
                    &:hover{
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
            }
            .submenu{
                &:after{
                    display: none;
                }
            }
        }
    }
`;

const KnowledgeDetailsWrap = Styled.div`
    .knowledge-details{
        padding: 0 30px;
        @media only screen and (max-width: 1399px){
            padding: 0;
        }
        img{
            width: 100%;
        }
        .knowledge-details__title{
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 20px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            @media only screen and (max-width: 1199px){
                font-size: 24px;
            }
        }
        .knowledge-details__single--block{
            &:first-child{
                margin-bottom: 55px;
            }
            &:not(:last-child){
                margin-bottom: 40px;
            }
            h4{
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 16px;
								color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                a{
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                }
            }
            p{
                font-size: 15px;
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            }
            .knowledge-details-img{
                margin-top: 30px;
            }
            .btn-more{
                display: inline-block;
                margin-top: 25px;
                &:hover{
                    text-decoration: underline;
                }
            }
            .ant-collapse {
                border: 0 none;
            }
            .ant-collapse-item{
                border: 0 none;
                .ant-collapse-header{
                    position: relative;
                    padding: 0;
                    background: none;
                    .anticon{
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background: #fff;
                        box-shadow: 0 2px 2px #92949F30;
                        &.anticon-right{
                            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: auto;
                            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
                        }
                        svg,
                        img,
                        i{
                            min-width: 14px;
                            color: ${({ theme }) => theme['primary-color']};
                        }
                    }
                }
                .ant-collapse-content {
                    border: 0 none;
                    .ant-collapse-content-box{
                        padding: 0;
                    }
                    .btn-more{
                        font-size: 12px;
                        font-weight: 500;
                        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                        text-transform: uppercase;
                    }
                }
            }
        }
        .knowledge-details-date-meta{
            font-size: 14px;
            color: ${({ theme }) => theme[theme.mainContent]['light-gray-text']};
            .date{
                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 3px;
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            }
        }
        .knowledge-details-cta{
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            margin: 25px 0;
            min-height: 106px;
            border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            box-shadow: 0 5px 10px ${({ theme }) => theme[theme.mainContent]['dark-text']}10;
            @media only screen and (max-width: 575px){
                flex-flow: column;
            }
            .knowledge-details-cta__text{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 40px;
                @media only screen and (max-width: 575px){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
                    margin-bottom: 15px;
                }
                margin-bottom: 0;
								color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
            }
            .knowledge-details-cta__actions{
                margin: -5px;
                button{
                    height: 36px;
                    padding: 0px 16px;
                    margin: 5px;
                    svg{
                        margin-right: 4px;
                    }
                }
            }
        }
        .knowledge-details__bottom{
            display: flex;
            justify-content: space-between;
            padding-bottom: 50px;
            margin-bottom: 25px;
            border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            @media only screen and (max-width: 575px){
                flex-flow: column;
            }
            .knowledge-details__bottom--left{
                font-size: 16px;
                font-weight: 500;
                @media only screen and (max-width: 575px){
                    margin-bottom: 15px;
                }
                a{
                    margin-left: 14px;
                    color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
                    &:hover{
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
            }
            .knowledge-details__bottom--right{
                .soical-share{
                    li{
                        display: inline-block;
                        font-size: 14px;
                        font-weight: 400;
                        &:first-child{
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
                        }
                        &:not(:last-child){
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                        }
                        a{
						    svg{
                                color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
                            }
                            &:hover{
                                svg{
                                    color: ${({ theme }) => theme['primary-color']};
                                }
                            }
                        }
                    }
                }
            }
        }
        .knowledge-details-pagination{
            margin-bottom: 45px;
            ul{
                display: flex;
                justify-content: space-between;
                @media only screen and (max-width: 575px){
                    flex-direction: column;
                }
                li{
                    &.page-next{
                        a{
                            span.fa, svg{
                                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
                            }
                        }
                    }
                    &.page-previous{
                        @media only screen and (max-width: 575px){
                            margin-top: 10px;
                        }
                        a{
                            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                            @media only screen and (max-width: 575px){
                                text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
                            }
                            span.fa, svg{
                                margin-left: 8px;
                                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 8px;
                            }
                        }
                        .pagintaion-label{
                            justify-content: flex-end;
                            @media only screen and (max-width: 575px){
                                justify-content: flex-start;
                            }
                        }
                    }
                    a{
                        .pagintaion-label{
                            display: flex;
                            align-items: center;
                            margin-bottom: 6px;
                            span.fa{
                                display: inline-block;
                                font-size: 14px;
                            }
                            span, svg{
                                font-size: 13px;
                                font-weight: 400;
                                color: ${({ theme }) => theme[theme.mainContent]['light-text']};
                            }
														svg{
															fill: ${({ theme }) => theme[theme.mainContent]['light-text']};
														}
                        }
                        .knowledge-details-title{
                            font-size: 14px;
														color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                        }
                    }
                }
            }
            .knowledge-sidebar-trigger{
                background-color: ${({ theme }) => theme['primary-color']};
            }
        }
    }
    .related-article-list{
        padding: 24px 30px 20px;
        border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        margin-bottom: 30px;
        border-radius: 5px;
        .related-article-list__title{
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 18px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        .related-article{
            li{
                &:not(:last-child){
                    margin-bottom: 10px;
                }
                .related-article__single{
                    display: flex;
                    .article-icon{
                        margin-right: 12px;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        i,
                        span{
                            color: #CCD4DE;
                        }
												svg{
                            fill: #CCD4DE;
                        }
                    }
                    .related-article__title{
                        font-size: 15px;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    }
                }
                a{
                    font-size: 15px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                }
            }
        }
    }
    .ninjadash_comment-form{
        border-radius: 5px;
        padding: 20px 30px 30px;
        border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        .ninjadash_comment-form__title{
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 20px;
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        .ant-form-item{
            .ant-form-item-label{
                padding: 0 0 10px;
                label{
                    font-size: 15px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                }
            }
            .ant-input{
                background: none;
                border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            }
            textarea{
                resize: none;
                border-radius: 4px;
                min-height: 150px;
								background: none;
            }
        }
        .btn-submit{
            font-size: 14px;
            height: 46px;
            padding: 0px 29.95px;
            font-weight: 500;
        }
    }
`;

export {
  KnowledgebaseTopWrap,
  KnowledgebaseArticleWrap,
  PopularArticleWrap,
  ArticleTabWrap,
  ArticleTabContentWrap,
  CtaWrap,
  ArticleListWrap,
  SingleKnowledgeContent,
  SidebarNavWrap,
  KnowledgeDetailsWrap,
};
