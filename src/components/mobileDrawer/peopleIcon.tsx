import React from "react";

function PeopleIcon({color}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33698 11.9649C8.14502 11.9649 8.93489 11.7253 9.60672 11.2763C10.2785 10.8273 10.8022 10.1892 11.1113 9.4426C11.4204 8.69602 11.5011 7.87453 11.3433 7.08205C11.1855 6.28957 10.7962 5.56171 10.2246 4.99051C9.65306 4.41932 8.92496 4.03045 8.13239 3.87311C7.33981 3.71578 6.51837 3.79702 5.77197 4.10659C5.02558 4.41616 4.38777 4.94013 3.93921 5.61223C3.49064 6.28434 3.25146 7.07438 3.25195 7.88242C3.25328 8.96519 3.68417 10.0032 4.45004 10.7686C5.21591 11.534 6.2542 11.9643 7.33698 11.9649ZM7.33698 5.63242C7.78198 5.63242 8.217 5.76438 8.58701 6.01162C8.95702 6.25885 9.24541 6.61025 9.41571 7.02138C9.58601 7.43252 9.63055 7.88491 9.54373 8.32137C9.45692 8.75783 9.24262 9.15874 8.92795 9.47341C8.61328 9.78808 8.21237 10.0024 7.77591 10.0892C7.33945 10.176 6.88706 10.1315 6.47592 9.96116C6.06479 9.79086 5.71339 9.50246 5.46616 9.13245C5.21892 8.76244 5.08698 8.32743 5.08698 7.88242C5.08698 7.28568 5.32402 6.71339 5.74597 6.29143C6.16793 5.86948 6.74024 5.63242 7.33698 5.63242Z"
        fill={color}
      />
      <path
        d="M22.1575 13.5874C21.7476 13.1765 21.2604 12.8508 20.7241 12.629C20.1878 12.4071 19.6129 12.2936 19.0325 12.2949H13.7825C12.7089 12.2966 11.6724 12.6874 10.865 13.3949C10.636 13.3582 10.4044 13.339 10.1725 13.3374H4.92249C3.7502 13.3381 2.62607 13.8039 1.79691 14.6326C0.967741 15.4613 0.501324 16.5851 0.5 17.7574V20.2749C0.5 20.3954 0.523716 20.5147 0.569824 20.626C0.615933 20.7374 0.68351 20.8385 0.768707 20.9237C0.853905 21.0089 0.95506 21.0765 1.06638 21.1226C1.17769 21.1687 1.29699 21.1924 1.41748 21.1924H13.6675C13.9108 21.1924 14.1442 21.0958 14.3163 20.9237C14.4883 20.7516 14.585 20.5183 14.585 20.2749V20.1474H22.5325C22.7758 20.1474 23.0092 20.0508 23.1812 19.8787C23.3533 19.7066 23.45 19.4733 23.45 19.2299V16.7049C23.4509 16.1257 23.3371 15.5521 23.1153 15.017C22.8934 14.482 22.5679 13.9961 22.1575 13.5874ZM12.7525 19.3599H2.32498V17.7599C2.32399 17.4187 2.39054 17.0806 2.52075 16.7651C2.65097 16.4497 2.84228 16.1631 3.08371 15.9219C3.32514 15.6807 3.61191 15.4896 3.92749 15.3597C4.24307 15.2298 4.58122 15.1636 4.92249 15.1649H10.1725C10.4178 15.165 10.6618 15.1995 10.8975 15.2674C11.1164 15.3319 11.3257 15.4253 11.52 15.5449C11.6948 15.6507 11.856 15.7775 12 15.9224C12.2394 16.1625 12.4289 16.4476 12.5576 16.7612C12.6863 17.0749 12.7517 17.4109 12.75 17.7499V19.3499L12.7525 19.3599ZM21.6175 18.3149H14.5875V17.7599C14.589 17.1793 14.4753 16.6041 14.2531 16.0677C14.0308 15.5313 13.7043 15.0443 13.2925 14.6349C13.1689 14.5112 13.0378 14.3951 12.9 14.2874C13.182 14.1845 13.4798 14.1321 13.78 14.1324H19.03C19.5062 14.1316 19.9733 14.2623 20.38 14.5099C20.5533 14.6179 20.7142 14.7445 20.86 14.8874C21.0993 15.1281 21.2888 15.4136 21.4175 15.7276C21.5462 16.0417 21.6116 16.378 21.61 16.7174L21.6175 18.3149Z"
        fill={color}
      />
      <path
        d="M16.2026 10.92C17.0108 10.9205 17.8009 10.6813 18.4731 10.2326C19.1452 9.78392 19.6692 9.14595 19.9787 8.39942C20.2882 7.65288 20.3693 6.83131 20.2117 6.03867C20.0542 5.24602 19.6651 4.51791 19.0936 3.94646C18.5222 3.37501 17.7941 2.98591 17.0014 2.82837C16.2088 2.67083 15.3872 2.75194 14.6407 3.06143C13.8941 3.37093 13.2562 3.89489 12.8075 4.56705C12.3589 5.23921 12.1196 6.02935 12.1201 6.8375C12.1221 7.91963 12.5528 8.95688 13.318 9.72206C14.0832 10.4873 15.1205 10.918 16.2026 10.92ZM16.2026 4.5875C16.6476 4.5875 17.0826 4.71946 17.4526 4.96669C17.8226 5.21393 18.111 5.56532 18.2813 5.97646C18.4516 6.38759 18.4962 6.83999 18.4094 7.27645C18.3225 7.7129 18.1083 8.11382 17.7936 8.42848C17.4789 8.74315 17.078 8.95745 16.6416 9.04427C16.2051 9.13108 15.7527 9.08653 15.3416 8.91623C14.9305 8.74593 14.579 8.45754 14.3318 8.08753C14.0846 7.71752 13.9526 7.2825 13.9526 6.8375C13.9526 6.24076 14.1896 5.66846 14.6116 5.24651C15.0336 4.82455 15.6059 4.5875 16.2026 4.5875Z"
        fill={color}
      />
    </svg>
  );
}

export default PeopleIcon;
