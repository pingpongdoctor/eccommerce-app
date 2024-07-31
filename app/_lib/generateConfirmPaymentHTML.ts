import { SanityDocument } from 'next-sanity';

export const generateConfirmPaymentHTML = function (
  products: (ProductWithImgUrl &
    SanityDocument & { productQuantity: number })[],
  transactionNumber: string,
  expectedTime: string,
  subtotal: string,
  tax: string,
  shipping: string,
  total: string
) {
  let htmlElements = '';
  products.map(
    (
      product: ProductWithImgUrl & SanityDocument & { productQuantity: number }
    ) => {
      htmlElements =
        htmlElements +
        `  <div
   style="
     display: flex;
     gap: 1rem;
     padding-left: 30px;
     margin-bottom: 1rem;
   "
 >
   <img src="${product.imgUrl}" alt="img-1" style="width: 140px;
   height: auto;" />
   <div style="margin-left:1rem">
     <p style="margin-bottom: 1rem">${product.title}</p>
     <p>Price: $${product.price}</p>
     <p>Quantity: ${product.productQuantity}</p>
   </div>
 </div>`;
    }
  );

  return `<html
  data-editor-version="2"
  class="sg-campaigns"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <style type="text/css">
      body,
      p,
      div {
        font-family: inherit;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <link
      href="https://fonts.googleapis.com/css?family=Viga&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Viga", sans-serif;
      }
    </style>
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#f0f0f0;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#f0f0f0"
        >
          <tr>
            <td valign="top" bgcolor="#f0f0f0" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 30px 20px 40px 30px"
                                  bgcolor="#77dedb"
                                  data-distribution="1"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="550"
                                          style="
                                            width: 550px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="1995753e-0c64-4075-b4ad-321980b82dfe"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 100px 0px
                                                            18px 0px;
                                                          line-height: 36px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                          style="
                                                            font-family: inherit;
                                                            text-align: inherit;
                                                          "
                                                        >
                                                          <span
                                                            style="
                                                              color: #ffffff;
                                                              font-size: 40px;
                                                              font-family: inherit;
                                                              margin-bottom: 32px;
                                                            "
                                                            >Glowy Lab</span
                                                          >
                                                        </div>

                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                color: #ffffff;
                                                                font-size: 40px;
                                                                font-family: inherit;
                                                              "
                                                              >Thank you for
                                                              your order!</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="2ffbd984-f644-4c25-9a1e-ef76ac62a549"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 20px
                                                            20px 0px;
                                                          line-height: 24px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  class="module"
                                                  data-role="module-button"
                                                  data-type="button"
                                                  role="module"
                                                  style="table-layout: fixed"
                                                  width="100%"
                                                  data-muid="69fc33ea-7c02-45ed-917a-b3b8a6866e89"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        align="left"
                                                        bgcolor=""
                                                        class="outer-td"
                                                        style="
                                                          padding: 0px 0px 0px
                                                            0px;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          class="wrapper-mobile"
                                                          style="
                                                            text-align: center;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                align="center"
                                                                bgcolor="#000000"
                                                                class="inner-td"
                                                                style="
                                                                  border-radius: 6px;
                                                                  font-size: 16px;
                                                                  text-align: left;
                                                                  background-color: inherit;
                                                                "
                                                              >
                                                                <a
                                                                  href="https://ecommerece-app-for-thao.vercel.app/order-history"
                                                                  style="
                                                                    background-color: #000000;
                                                                    border: 1px
                                                                      solid
                                                                      #000000;
                                                                    border-color: #000000;
                                                                    border-radius: 0px;
                                                                    border-width: 1px;
                                                                    color: #ffffff;
                                                                    display: inline-block;
                                                                    font-size: 18px;
                                                                    font-weight: normal;
                                                                    letter-spacing: 0px;
                                                                    line-height: normal;
                                                                    padding: 12px
                                                                      18px 12px
                                                                      18px;
                                                                    text-align: center;
                                                                    text-decoration: none;
                                                                    border-style: solid;
                                                                    font-family: inherit;
                                                                  "
                                                                  target="_blank"
                                                                  >Follow Your
                                                                  Delivery</a
                                                                >
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="8b5181ed-0827-471c-972b-74c77e326e3d"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 30px 20px 18px 30px;
                                          line-height: 22px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #0055ff;
                                                font-size: 24px;
                                              "
                                              >Order Summary</span
                                            >
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="divider"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f7373f10-9ba4-4ca7-9a2e-1a2ba700deb9"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 30px 0px 30px"
                                        role="module-content"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          height="3px"
                                          style="
                                            line-height: 3px;
                                            font-size: 3px;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="padding: 0px 0px 3px 0px"
                                                bgcolor="#e7e7e7"
                                              ></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 20px 18px 30px;
                                          line-height: 22px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            Transaction Number:
                                            ${transactionNumber}
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <span style="color: #0055ff"
                                              ><strong
                                                >Expected Delivery Time:
                                                ${expectedTime}</strong
                                              ></span
                                            >
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <br />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div>${htmlElements}</div>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="divider"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f7373f10-9ba4-4ca7-9a2e-1a2ba700deb9.1"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 20px 30px 0px 30px"
                                        role="module-content"
                                        height="100%"
                                        valign="top"
                                        bgcolor="#FFFFFF"
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          height="3px"
                                          style="
                                            line-height: 3px;
                                            font-size: 3px;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="padding: 0px 0px 3px 0px"
                                                bgcolor="#E7E7E7"
                                              ></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="264ee24b-c2b0-457c-a9c1-d465879f9935.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 20px 30px 30px;
                                          line-height: 22px;
                                          text-align: inherit;
                                          background-color: #ffffff;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor="#FFFFFF"
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            Subtotal - $${subtotal}
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            Taxes - $${tax}
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            Delivery Charges - $${shipping}
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <br />
                                            Total
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <br />
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #0055ff;
                                                font-size: 32px;
                                                font-family: inherit;
                                              "
                                              >$${total}</span
                                            >
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 0px 20px 0px 20px"
                                  bgcolor="#0055ff"
                                  data-distribution="1,1,1,1"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="140"
                                          style="
                                            width: 140px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="9d43ffa1-8e24-438b-9484-db553cf5b092"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 0px 18px
                                                            0px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <a
                                                              href="https://ecommerece-app-for-thao.vercel.app/"
                                                              ><span
                                                                style="
                                                                  color: #ffffff;
                                                                "
                                                                >Home</span
                                                              ></a
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          width="140"
                                          style="
                                            width: 140px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-1"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="9d43ffa1-8e24-438b-9484-db553cf5b092.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 0px 18px
                                                            0px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <a
                                                              href="https://ecommerece-app-for-thao.vercel.app/blog"
                                                              ><span
                                                                style="
                                                                  color: #ffffff;
                                                                "
                                                                >Blogs</span
                                                              ></a
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          width="140"
                                          style="
                                            width: 140px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-2"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="9d43ffa1-8e24-438b-9484-db553cf5b092.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 0px 18px
                                                            0px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <a
                                                              href="https://ecommerece-app-for-thao.vercel.app/beta-page"
                                                              ><span
                                                                style="
                                                                  color: #ffffff;
                                                                "
                                                                >Contact</span
                                                              ></a
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          width="140"
                                          style="
                                            width: 140px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-3"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="9d43ffa1-8e24-438b-9484-db553cf5b092.1.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 0px 18px
                                                            0px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <a
                                                              href="https://ecommerece-app-for-thao.vercel.app/beta-page"
                                                              ><span
                                                                style="
                                                                  color: #ffffff;
                                                                "
                                                                >About</span
                                                              ></a
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`;
};
