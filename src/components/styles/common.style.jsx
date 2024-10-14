// components/Button.js
import styled from "styled-components";

// export default MainDiv;

const CommonPageblock = styled.div`
  position: relative;
  .common-header {
    position: absolute;
    z-index: 9;
    padding: 30px 0px;
    left: 0px;
    right: 0px;
    .common-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
        align-items: center;
        li {
          padding: 0px 30px;
          &:last-child {
            padding-right: 0px;
          }
          a {
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
            font-family: Jost;
            color: #fff;
            transition: 0.5s;
            &:hover {
              color: #006b20;
            }
          }
          .header-btn {
            background-color: rgba(255, 255, 255, 0.4);
            padding: 11px 12px;
            width: 120px;
            font-size: 18px;
            line-height: 18px;
            font-family: Jost;
            color: #fff;
            font-weight: 600;
          }
          &.dropdown-header {
            position: relative;
            .dropdown-header-inner {
              .dropdown-header-inner-link {
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.4);
                padding: 11px 12px;
                width: 120px;
                span {
                  font-size: 18px;
                  line-height: 18px;
                  font-family: Jost;
                  color: #fff;
                  font-weight: 600;
                }
              }
            }
            .dropdown-header-inner-link-open {
              position: absolute;
              /* width: 100%; */
              background-color: #fff;
              border-radius: 0px;
              padding: 0px;
              left: 0px;
              right: 0px;
              ul {
                margin: 0px;
                padding: 0px;
                display: block;
                li {
                  padding: 0px;
                  a {
                    color: #333;
                    font-size: 14px;
                    line-height: 14px;
                    padding: 10px;
                    display: block;
                    &:hover {
                      color: #fff;
                      background-color: #006b20;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .common-container {
    max-width: 1520px;
    padding: 0px 15px;
    margin: 0 auto;
  }
  .common-padding {
    padding: 100px 0px;
    &.pad-top-none {
      padding-top: 0px;
    }
  }
  .common-btn {
    padding: 14px 28px;
    border-radius: 0px;
    background-color: #006b20;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    text-transform: capitalize;
    font-family: Jost;
    transition: 0.5s;
    color: #fff;
    &:hover {
      opacity: 0.7;
      transition: 0.5s;
    }
  }
  .common-title {
    position: relative;
    margin-bottom: 30px;
    &.mb-custom-60 {
      margin-bottom: 60px;
    }
    .common-title-inner {
      position: relative;
      margin-bottom: 15px;
      h2 {
        -webkit-text-stroke: 1px rgba(52, 52, 52, 0.2);
        color: #fff;
        font-weight: 800;
        font-size: 160px;
        line-height: 160px;
        font-family: Poppins;
        position: relative;
        left: -10px;
      }
      h5 {
        position: absolute;
        top: 0px;
        left: 0px;
        top: 60%;
        transform: translate(0px, -50%);
        color: #006b20;
        font-size: 30px;
        line-height: 30px;
        font-weight: 400;
      }
    }
    h3 {
      font-weight: 700;
      font-size: 60px;
      line-height: 60px;
      color: #333;
    }
  }
  .common-page {
    position: relative;
    .main-banner {
      position: relative;
      height: 900px;
      background-image: url(../../images/banner-img.png);
      background-size: cover;
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        background-image: url(../../images/overlay-banner.png);
      }
      .common-container {
        position: relative;
        height: 100%;
      }
      .main-banner-text {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 0px;
        right: 0px;
        h3 {
          font-size: 30px;
          line-height: 30px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 15px;
        }
        h1 {
          font-size: 60px;
          line-height: 60px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 30px;
        }
        p {
          font-size: 20px;
          line-height: 30px;
          color: #fff;
          font-weight: 400;
          margin-bottom: 30px;
          width: 45%;
        }
      }
    }
    .about-section {
      .about-section-flex {
        display: flex;
        align-items: center;
        margin: 0px -50px;
        .about-section-flex-left {
          width: 50%;
          padding: 0px 50px;
          p {
            font-size: 20px;
            line-height: 30px;
            color: #7f7f7f;
            margin-bottom: 20px;
            font-weight: 300;
          }
          .common-btn-about {
            margin-top: 45px;
            display: flex;
          }
        }
        .about-section-flex-right {
          width: 50%;
          padding: 0px 50px;
          display: flex;
          align-items: center;
          margin: 0px -15px;
          .about-block-flex {
            width: 50%;
            padding: 0px 15px;
          }
          .top-img {
            img {
              width: 100%;
              height: 400px;
              object-fit: cover;
            }
          }
          .top-img-contact {
            margin-top: 40px;
            background-color: rgba(235, 235, 235, 0.4);
            padding: 30px;
            text-align: center;
            p {
              font-family: Jost;
              font-size: 30px;
              color: #525252;
              line-height: 30px;
              font-weight: 400;
              margin-bottom: 10px;
            }
            a {
              color: #006b20;
              font-size: 32px;
              line-height: 32px;
              font-weight: 500;
              display: block;
              font-family: Jost;
            }
          }
        }
      }
    }
    .care-section {
      position: relative;
      background-color: #333333;
      padding: 80px 0px 200px;
      margin-bottom: 120px;
      .care-section-inner {
        position: relative;
      }
      .care-section-text {
        text-align: center;
        h2 {
          font-weight: 700;
          font-size: 60px;
          line-height: 60px;
          color: #fff;
          margin-bottom: 30px;
        }
        p {
          font-size: 24px;
          line-height: 30px;
          color: #fff;
          font-weight: 300;
          /* margin-bottom: 60px; */
          width: 90%;
          text-align: center;
          margin: 0 auto 60px;
          display: table;
        }
        .care-section-text-link {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .team-block-inner {
        padding: 45px 15px;
        background-color: #fff;
        box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        position: absolute;
        left: 0px;
        right: 0;
        bottom: -300px;
        .team-block-inner-block {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          h2 {
            font-weight: 600;
            font-size: 80px;
            line-height: 80px;
            color: #006b20;
            margin-bottom: 15px;
          }
          p {
            font-size: 30px;
            line-height: 40px;
            color: #333;
            font-family: Jost;
          }
        }
      }
    }
    .service-section {
      .common-title {
        text-align: center;
        margin: 0 auto 60px;
        display: table;
        .common-title-inner {
          h5 {
            transform: translate(-50%, -50%);
            left: 50%;
          }
        }
      }
      .service-section-inner {
        display: flex;
        margin: 0px -15px;
        flex-wrap: wrap;
        .service-section-inner-block {
          width: 33.33%;
          padding: 0px 15px 30px;
          &:nth-child(2) {
            .service-section-text {
              &::before {
                content: "02";
              }
            }
          }
          &:nth-child(3) {
            .service-section-text {
              &::before {
                content: "03";
              }
            }
          }
          &:nth-child(4) {
            .service-section-text {
              &::before {
                content: "04";
              }
            }
          }
          &:nth-child(5) {
            .service-section-text {
              &::before {
                content: "05";
              }
            }
          }
          &:nth-child(6) {
            .service-section-text {
              &::before {
                content: "06";
              }
            }
          }
          &:nth-child(7) {
            .service-section-text {
              &::before {
                content: "07";
              }
            }
          }
          &:nth-child(8) {
            .service-section-text {
              &::before {
                content: "08";
              }
            }
          }
          &:nth-child(9) {
            .service-section-text {
              &::before {
                content: "09";
              }
            }
          }
          &:nth-child(10) {
            .service-section-text {
              &::before {
                content: "10";
              }
            }
          }
          &:nth-child(11) {
            .service-section-text {
              &::before {
                content: "11";
              }
            }
          }
          &:nth-child(12) {
            .service-section-text {
              &::before {
                content: "12";
              }
            }
          }
          &:nth-child(13) {
            .service-section-text {
              &::before {
                content: "13";
              }
            }
          }
          &:nth-child(14) {
            .service-section-text {
              &::before {
                content: "14";
              }
            }
          }
          &:nth-child(15) {
            .service-section-text {
              &::before {
                content: "15";
              }
            }
          }
          &:nth-child(16) {
            .service-section-text {
              &::before {
                content: "16";
              }
            }
          }
          .service-section-text {
            padding: 120px 20px 35px 20px;
            background-color: rgba(246, 246, 246, 30%);
            box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 10%);
            position: relative;
            transition: 0.5s;
            &:hover {
              background-size: cover;
              &::before {
                -webkit-text-stroke: 1px #fff;
                color: rgba(0, 0, 0, 0.7);
              }
              &:after {
                content: "";
                position: absolute;
                left: 0px;
                right: 0px;
                top: 0px;
                bottom: 0px;
                background-color: rgba(0, 0, 0, 0.7);
                width: 100%;
                height: 100%;
              }
              h3 {
                border-color: #fff;
              }
              h3,
              p {
                color: #fff;
              }
              .common-btn {
                background-color: #006b20;
                color: #fff;
              }
            }
            &::before {
              content: "01";
              position: absolute;
              top: 30px;
              left: 20px;
              -webkit-text-stroke: 1px rgba(52, 52, 52, 0.6);
              color: #fff;
              font-weight: 800;
              font-size: 80px;
              line-height: 80px;
              font-family: Poppins;
              z-index: 9;
            }
            h3 {
              font-size: 30px;
              line-height: 30px;
              color: #333;
              font-weight: 500;
              padding-bottom: 20px;
              margin-bottom: 20px;
              border-bottom: 1px solid rgba(82, 82, 82, 20%);
              position: relative;
              z-index: 9;
            }
            p {
              font-size: 18px;
              line-height: 30px;
              margin-bottom: 30px;
              font-weight: 300;
              color: #7f7f7f;
              position: relative;
              z-index: 9;
            }
            .common-btn {
              font-size: 18px;
              line-height: 20px;
              color: #006b20;
              border: 1px solid #006b20;
              padding: 8px 18px;
              background-color: transparent;
              transition: 0.5s;
              position: relative;
              z-index: 9;
            }
          }
        }
      }
      .services-block-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
      }
    }
    .book-service-block {
      padding: 100px 0px 250px;
      position: relative;
      .common-title {
        text-align: center;
        h5 {
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .book-service-block-inner {
        position: relative;
        margin-top: 50px;
        .right-side-img {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 70%;
          > img {
            width: 100%;
            height: 900px;
            object-fit: cover;
          }
        }
        .left-side-form {
          width: 900px;
          padding: 40px;
          box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 0.2);
          position: relative;
          z-index: 9;
          background-color: #fff;
          position: relative;
          top: 110px;
          .common-title-form {
            font-size: 40px;
            line-height: 40px;
            color: #333;
            margin-bottom: 30px;
            font-weight: 700;
          }
          .form-group {
            margin-bottom: 30px;
            position: relative;
            input {
              width: 100%;
              height: 60px;
              border: 1px solid rgba(82, 82, 82, 20%);
              padding: 10px 20px;
              border-radius: 0px;
              font-size: 16px;
              color: #525252;
              outline: none;
              box-shadow: none;
              font-family: Mulish;
              &::placeholder {
                color: #525252;
              }
            }
            .text-red-500 {
              position: absolute;
              font-size: 12px;
              line-height: 15px;
            }
            .react-select__input-container,
            .react-select__value-container {
              margin: 0px;
              padding: 0px;
            }
            .react-select__control {
              height: 60px;
              border: 1px solid rgba(82, 82, 82, 20%);
              padding: 0px 20px;
              border-radius: 0px;
              font-size: 16px;
              color: #000 !important;
              font-family: Mulish;
            }
            .react-select__input {
              font-size: 16px;
              color: #000 !important;
              outline: none;
              box-shadow: none;
              font-family: Mulish;
              &::placeholder {
                color: #000 !important;
              }
            }
            .react-select__indicators {
              .react-select__indicator-separator {
                display: none;
              }
              svg {
                path {
                  fill: #000;
                }
              }
            }
          }
          .services-option-block {
            position: relative;
            margin-bottom: 30px;
            .services-block-main {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid rgba(82, 82, 82, 20%);
              padding: 10px 20px;
              cursor: pointer;
              height: 60px;
              input {
                margin: 0px;
                font-size: 16px;
                color: #525252;
                width: 100%;
                outline: none;
              }
              p {
                margin: 0px;
                font-size: 16px;
                color: #525252;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .open-block-sevices {
              position: absolute;
              top: 60px;
              left: 0px;
              right: 0px;
              box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 0.2);
              background-color: #fff;
              z-index: 9;
              .open-block-sevices-inner {
                padding: 10px;
                .styled-checkbox {
                  position: absolute;
                  opacity: 0;
                  + label {
                    position: relative;
                    font-family: Mulish;
                    font-size: 16px;
                    cursor: pointer;
                    padding: 0;
                    &::before {
                      content: "";
                      margin-right: 10px;
                      display: inline-block;
                      vertical-align: text-top;
                      width: 20px;
                      height: 20px;
                      background: white;
                      border: 1px solid rgba(82, 82, 82, 20%);
                    }
                  }
                }
                .styled-checkbox:hover + label:before {
                  background: #006b20;
                }
                .styled-checkbox:focus + label:before {
                  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
                }
                .styled-checkbox:checked + label:before {
                  background: #006b20;
                }
                .styled-checkbox:disabled + label {
                  color: #525252;
                  cursor: auto;
                }
                .styled-checkbox:disabled + label:before {
                  box-shadow: none;
                  background: #ddd;
                }
                .styled-checkbox:checked + label:after {
                  content: "";
                  position: absolute;
                  left: 5px;
                  top: 9px;
                  background: white;
                  width: 2px;
                  height: 2px;
                  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
                    4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
                  transform: rotate(45deg);
                }
              }
            }
          }
          .form-group-two {
            display: flex;
            margin: 0px -15px;
            .form-group {
              width: 50%;
              padding: 0px 15px;
              position: relative;
              textarea {
                width: 100%;
                height: 100px;
                border: 1px solid rgba(82, 82, 82, 20%);
                padding: 10px 20px;
                border-radius: 0px;
                font-size: 16px;
                color: #525252;
                outline: none;
                box-shadow: none;
                resize: none;
                font-family: Mulish;
                &::placeholder {
                  color: #525252;
                }
              }
              .react-datepicker-wrapper {
                width: 100%;
                .react-datepicker__input-container {
                  width: 100%;
                }
              }
              .icon-block-calender {
                position: absolute;
                top: 15px;
                right: 31px;
              }
              .react-time-picker {
                width: 100%;
                height: 60px;
                border: 1px solid rgba(82, 82, 82, 20%);
                padding: 10px 20px;
                border-radius: 0px;
                font-size: 16px;
                color: #525252;
                outline: none;
                box-shadow: none;
                font-family: Mulish;
                .react-time-picker__wrapper {
                  border: none;
                  input {
                    height: auto;
                    border: none;
                    padding: 5px;
                  }
                  .react-time-picker__clock-button {
                    svg {
                      height: 30px;
                      width: 30px;
                      stroke: #006b20;
                    }
                  }
                }
              }
            }
          }
          .four-block-input {
            display: flex;
            margin: 0px -15px;
            .form-group {
              width: 25%;
              padding: 0px 15px;
            }
          }
        }
      }
    }
    .plan-pricing-block {
      position: relative;
      padding: 100px 0px;
      .common-title {
        text-align: center;
      }
      .plan-pricing-block-inner {
        display: flex;
        margin: 50px -15px 0px;
        .plan-pricing-block-inner-block {
          width: 33.33%;
          padding: 0px 15px;
          .plan-pricing {
            box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 0.2);
            background-color: #fff;
            padding: 30px 20px;
            h2 {
              font-size: 30px;
              line-height: 30px;
              color: #333333;
              padding-bottom: 20px;
              border-bottom: 1px solid rgba(82, 82, 82, 20%);
              font-weight: 500;
            }
            p {
              padding: 20px 0;
              font-size: 18px;
              line-height: 30px;
              color: #7f7f7f;
            }
            a {
              padding: 12px 20px;
              background-color: #006b20;
              font-size: 20px;
              line-height: 20px;
              color: #fff;
              font-weight: 700;
              outline: none;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .portfolio-section {
    position: relative;
    .portfolio-slider {
      padding-left: 11%;
      .portfolio-slider-inner {
        .slick-slide {
          padding: 15px;
        }
        .portfolio-slider-inner-block {
          position: relative;
          overflow: hidden;
          &:hover {
            .portfolio-slider-inner-block-hover {
              transition: 0.5s;
              left: 50%;
            }
          }
          > img {
            width: 100%;
            height: 500px;
            object-fit: cover;
          }
          .portfolio-slider-inner-block-hover {
            position: absolute;
            left: -100%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 25px;
            height: 100%;
            width: 100%;
            transition: 0.5s;
            .portfolio-slider-inner-block-hover-inner {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              padding: 20px;
              text-align: center;
              h2 {
                font-size: 30px;
                line-height: 36px;
                margin-bottom: 10px;
                color: #fff;
              }
              p {
                font-size: 16px;
                line-height: 26px;
                color: #fff;
                margin-bottom: 25px;
              }
            }
          }
        }
      }
    }
  }
  .react-time-picker__clock {
    display: none !important;
  }
  .our-services-block {
    position: relative;
    padding: 100px 0px;
    .common-title {
      text-align: center;
      margin: 0 auto 60px;
      display: table;
      .common-title-inner {
        h5 {
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
    .react-custom-tabs {
      .react-custom-tabs-left {
        .react-tabs {
          display: flex;
          margin: 0px -15px;
          .react-tabs__tab-list {
            border: none;
            display: block;
            width: 30%;
            padding: 0px 15px;
            .react-tabs__tab {
              padding: 0px;
              border: none;
              height: 180px;
              margin-bottom: 30px;
              border: none;
              width: 100%;
              .tabs-link-block {
                padding: 20px;
                box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 10%);
                margin-bottom: 30px;
                cursor: pointer;
                height: 100%;
                position: relative;
                h2 {
                  -webkit-text-stroke: 1px rgba(52, 52, 52, 0.6);
                  color: #fff;
                  font-weight: 800;
                  font-size: 80px;
                  line-height: 80px;
                  font-family: Mulish;
                  position: relative;
                  z-index: 9;
                }
                h3 {
                  font-weight: 500;
                  font-size: 30px;
                  line-height: 30px;
                  color: #333;
                  margin-top: 20px;
                  position: relative;
                  z-index: 9;
                }
                .tabs-link-block-hover {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  display: none;
                  transition: 0.5s;
                  &::before {
                    content: "";
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    background-color: rgba(0, 0, 0, 0.7);
                    width: 100%;
                    height: 100%;
                  }
                  > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
              }
              &.react-tabs__tab--selected,
              &:hover {
                .tabs-link-block {
                  box-shadow: none;
                  h2 {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
                    color: #000;
                  }
                  h3 {
                    color: #fff;
                  }
                  .tabs-link-block-hover {
                    display: block;
                  }
                }
              }
            }
          }
          .react-tabs__tab-panel {
            padding: 0px 15px;
            width: 70%;
            .tab-content-block {
              border: 1px solid rgba(52, 52, 52, 0.2);
              .tab-content-block-inner {
                display: flex;
                padding: 30px 20px;
                border-bottom: 1px solid rgba(52, 52, 52, 0.2);
                &:last-child {
                  border: none;
                }
                .tab-content-block-inner-left {
                  width: 75%;
                  padding-right: 25px;
                  h2 {
                    color: #333;
                    margin-bottom: 20px;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 40px;
                  }
                  p {
                    color: #7f7f7f;
                    font-size: 18px;
                    line-height: 30px;
                    margin-bottom: 10px;
                  }
                  .checkbox-custom {
                    .checkbox-custom-inner {
                      .styled-checkbox {
                        position: absolute;
                        opacity: 0;
                        + label {
                          position: relative;
                          font-family: Mulish;
                          font-size: 16px;
                          cursor: pointer;
                          padding: 0;
                          &::before {
                            content: "";
                            margin-right: 10px;
                            display: inline-block;
                            vertical-align: text-top;
                            width: 30px;
                            height: 30px;
                            background: white;
                            border: 2px solid #006b20;
                          }
                        }
                      }
                      .styled-checkbox:hover + label:before {
                        background: transparent;
                      }
                      .styled-checkbox:focus + label:before {
                        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
                      }
                      .styled-checkbox:checked + label:before {
                        background: transparent;
                      }
                      .styled-checkbox:disabled + label {
                        color: #525252;
                        cursor: auto;
                      }
                      .styled-checkbox:disabled + label:before {
                        box-shadow: none;
                        background: #ddd;
                      }
                      .styled-checkbox:checked + label:after {
                        content: "";
                        position: absolute;
                        left: 9px;
                        top: 14px;
                        background: #006b20;
                        width: 2px;
                        height: 2px;
                        box-shadow: 2px 0 0 #006b20, 4px 0 0 #006b20,
                          4px -2px 0 #006b20, 4px -4px 0 #006b20,
                          4px -6px 0 #006b20, 4px -8px 0 #006b20;
                        transform: rotate(45deg);
                      }
                    }
                  }
                }
                .tab-content-block-inner-right {
                  width: 25%;
                  > img {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                  }
                }
              }
            }
            .total-cost-block {
              margin-top: 60px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 14px 20px;
              background-color: #006b20;
              h4,
              button {
                font-size: 22px;
                line-height: 26px;
                color: #fff;
                font-weight: 700;
                margin: 0px;
                font-family: Jost;
              }
            }
          }
        }
      }
    }
  }
  .about-section-main {
    .common-title {
      text-align: center;
      .common-title-inner {
        h5 {
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
    .about-section-main-inner {
      padding: 80px 0px;
      p {
        text-align: center;
      }
    }
    .about-why {
      padding: 80px 0px;
      background-color: #333;
      position: relative;
      .about-why-left {
        .about-why-left-inner {
          width: 65%;
          > h3 {
            font-weight: 700;
            font-size: 60px;
            line-height: 60px;
            color: #fff;
            margin-bottom: 100px;
          }
          .flex-block-why {
            display: flex;
            margin: 0px -15px;
            .flex-block-why-inner {
              width: 45%;
              padding: 0px 15px;
              &:last-child {
                width: 55%;
              }
              .flex-block-why-inner-block {
                position: relative;
                padding: 0px 20px 20px;
                background-color: rgba(255, 255, 255, 0.2);
                height: 100%;
                .flex-icon {
                  width: 100px;
                  height: 100px;
                  background-color: #006b20;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: absolute;
                  top: -50px;
                }
                h3 {
                  font-size: 30px;
                  line-height: 36px;
                  color: #fff;
                  margin-bottom: 20px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                  padding: 80px 0px 20px;
                  margin-bottom: 20px;
                }
                p {
                  font-size: 20px;
                  line-height: 30px;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .about-why-right {
        position: absolute;
        right: 0px;
        top: 80px;
        width: 36%;
        img {
          width: 100%;
        }
      }
    }
  }
  .portfolio-block {
    position: relative;
    .common-title {
      text-align: center;
      .common-title-inner {
        h5 {
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
    .portfolio-block-main {
      display: flex;
      margin: 0px -15px;
      flex-wrap: wrap;
      .portfolio-block-inner {
        width: 33.33%;
        padding: 0px 15px 30px;
        .portfolio-slider-inner-block {
          position: relative;
          overflow: hidden;
          &:hover {
            .portfolio-slider-inner-block-hover {
              transition: 0.5s;
              left: 50%;
            }
          }
          > img {
            width: 100%;
            height: 500px;
            object-fit: cover;
          }
          .portfolio-slider-inner-block-hover {
            position: absolute;
            left: -100%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 25px;
            height: 100%;
            width: 100%;
            transition: 0.5s;
            .portfolio-slider-inner-block-hover-inner {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              padding: 20px;
              text-align: center;
              h2 {
                font-size: 30px;
                line-height: 36px;
                margin-bottom: 10px;
                color: #fff;
              }
              p {
                font-size: 16px;
                line-height: 26px;
                color: #fff;
                margin-bottom: 25px;
              }
            }
          }
        }
      }
    }
  }
  .contact-block {
    position: relative;
    .common-title {
      text-align: center;
      .common-title-inner {
        h5 {
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
    .contact-section-main {
      .contact-section-main-inner {
        display: flex;
        margin: 0px -30px;
        .contact-section-main-inner-left {
          width: 40%;
          padding: 0px 30px;
          h3 {
            font-size: 40px;
            line-height: 48px;
            margin-bottom: 10px;
            color: #333;
            font-weight: 700;
          }
          p {
            font-size: 18px;
            line-height: 28px;
            color: #7f7f7f;
          }
          .contact-info {
            margin-top: 50px;
            .contact-info-inner {
              display: flex;
              align-items: center;
              margin-bottom: 50px;
              &:last-child {
                margin: 0px;
              }
              .contact-info-inner-icon {
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #006b20;
              }
              .contact-info-right {
                padding-left: 20px;
                h4 {
                  font-size: 30px;
                  line-height: 36px;
                  margin-bottom: 10px;
                  color: #333;
                }
                p {
                  font-size: 18px;
                  line-height: 28px;
                  color: #525252;
                  margin: 0px;
                }
              }
            }
          }
        }
        .contact-section-main-inner-right {
          padding: 0px 30px;
          width: 60%;
          .contact-section-main-inner-right-inner {
            padding: 40px;
            background-color: #f6f6f6;
            box-shadow: 0px 0px 8px 2px rgba(51, 51, 51, 0.1);
            h2 {
              font-size: 40px;
              line-height: 50px;
              margin-bottom: 40px;
              font-weight: 700;
              color: #333;
            }
            .common-btn {
              width: 200px;
              padding: 18px 28px;
            }
            .form-group {
              padding: 0px 0px 30px;
              textarea {
                width: 100%;
                height: 100px;
                border-radius: 0px;
                background-color: #fff;
                border: 1px solid rgba(82, 82, 82, 20%);
                font-size: 16px;
                font-family: Mulish;
                outline: none;
                resize: none;
                padding: 10px 20px;
                color: #525252;
                &::-ms-input-placeholder {
                  /* Edge 12-18 */
                  color: #525252;
                }

                &::placeholder {
                  color: #525252;
                }
              }
            }
            .form-two {
              display: flex;
              margin: 0px -15px;
              .form-group {
                width: 50%;
                padding: 0px 15px 30px;
                input {
                  width: 100%;
                  height: 60px;
                  border-radius: 0px;
                  background-color: #fff;
                  border: 1px solid rgba(82, 82, 82, 20%);
                  font-size: 16px;
                  font-family: Mulish;
                  outline: none;
                  padding: 10px 20px;
                  color: #525252;
                  &::-ms-input-placeholder {
                    /* Edge 12-18 */
                    color: #525252;
                  }

                  &::placeholder {
                    color: #525252;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .privacy-block {
    .common-title {
      text-align: center;
      .common-title-inner {
        h5 {
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
    .privacy-section-main {
      h3 {
        font-size: 24px;
        line-height: 30px;
        color: #333;
        margin-bottom: 20px;
        font-weight: 700;
      }
      p {
        font-size: 20px;
        line-height: 30px;
        color: #7f7f7f;
        margin-bottom: 20px;
      }
    }
  }
`;

export default CommonPageblock;
