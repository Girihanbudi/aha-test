const resetPasswordPlainHTML = (link: string, name: string): string => {
  const inlineCSSHTML = `
  <div style="
    border-radius: 25px;
    text-align: center;
    box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
  ">
      <div style="
        background-color: #000000;
        color: #ffffff;
        text-align: center;
        padding: 10px 25px 10px 25px;
        border-radius: 10px 10px 0px 0px;
      ">
        <h2>AHA-TEST</h2>
      </div>
      <div style="padding: 40px 25px 25px 25px;">
        <h3>Dear ${name}</h3>
        <p>
          Reset your password here by clicking the button bellow
        </p>
        <div style="
             display: block;
             margin-left: auto;
             margin-right: auto;
             max-width: 150px;
          ">
            <a href="${link}" target="_blank">
              <p style="
                text-align: center;
                padding: 15px 20px;
                font-weight: 900;
                border-radius: 50px;
                background-color: #000000;
                color: #ffffff;
                box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
                -webkit-box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
                -moz-box-shadow: 0px 10px 12px -2px rgba(0,0,0,0.3);
                transition: background 0.5s, color 0.5s, box-shadow 0.5s;
              ">
                RESET
              </p>
            </a>
          </div>
      </div>

      <div style="
        {
          display: flex;
          justify-content: center;
        }
        :hover {
          box-shadow: 0px 7px 12px 0px rgba(0,0,0,0.4);
          background-color: #22333b;
        }
        ">
        <div>
          <p>
            If the button is broken you can copy the link bellow and paste it in
            new tab of your browser
          </p>
          
            <p style="color:dodgerblue !important">"${link}"</p>
        </div>
      </div>
      <div style="
        color: #ffffff;
        background-color: #000000;
        margin: 50px 0px 0px 0px;
        padding: 30px;
        border-radius: 0px 0px 10px 10px;
      ">
        @aha-test 2022
      </div>
    </div>
  `

  return inlineCSSHTML
}

export default resetPasswordPlainHTML
