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
        font-family: Mulish;
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
        content: '';
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
        .service-section-inner-block {
          width: 33.33%;
          padding: 0px 15px 30px;
          &:nth-child(2) {
            .service-section-text {
              &::before {
                content: '02';
              }
            }
          }
          &:nth-child(3) {
            .service-section-text {
              &::before {
                content: '03';
              }
            }
          }
          &:nth-child(4) {
            .service-section-text {
              &::before {
                content: '04';
              }
            }
          }
          &:nth-child(5) {
            .service-section-text {
              &::before {
                content: '05';
              }
            }
          }
          &:nth-child(6) {
            .service-section-text {
              &::before {
                content: '06';
              }
            }
          }
          &:nth-child(7) {
            .service-section-text {
              &::before {
                content: '07';
              }
            }
          }
          &:nth-child(8) {
            .service-section-text {
              &::before {
                content: '08';
              }
            }
          }
          &:nth-child(9) {
            .service-section-text {
              &::before {
                content: '09';
              }
            }
          }
          &:nth-child(10) {
            .service-section-text {
              &::before {
                content: '10';
              }
            }
          }
          &:nth-child(11) {
            .service-section-text {
              &::before {
                content: '11';
              }
            }
          }
          &:nth-child(12) {
            .service-section-text {
              &::before {
                content: '12';
              }
            }
          }
          &:nth-child(13) {
            .service-section-text {
              &::before {
                content: '13';
              }
            }
          }
          &:nth-child(14) {
            .service-section-text {
              &::before {
                content: '14';
              }
            }
          }
          &:nth-child(15) {
            .service-section-text {
              &::before {
                content: '15';
              }
            }
          }
          &:nth-child(16) {
            .service-section-text {
              &::before {
                content: '16';
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
              background-image: url(../../images/banner-img.png);
              background-size: cover;
              &::before {
                -webkit-text-stroke: 1px #fff;
                color: rgba(0, 0, 0, 0.7);
              }
              &:after {
                content: '';
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
              content: '01';
              position: absolute;
              top: 30px;
              left: 20px;
              -webkit-text-stroke: 1px rgba(52, 52, 52, 0.6);
              color: #fff;
              font-weight: 800;
              font-size: 80px;
              line-height: 80px;
              font-family: Mulish;
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
  }
`;


export default CommonPageblock;