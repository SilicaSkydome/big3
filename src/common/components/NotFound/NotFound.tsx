import React from 'react'
import s from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={s.container}>
        <svg width="380" height="212" viewBox="0 0 380 212" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9306 203.456C15.9306 203.456 -19.9623 135.065 24.9216 85.2887C69.8054 35.5138 108.407 63.0909 127.992 61.7077C147.578 60.3245 153.86 16.7299 211.799 3.58102C269.739 -9.56789 323.731 14.5984 317.897 57.9675C309.189 122.706 417.861 91.2915 362.045 203.739L15.9306 203.456Z" fill="#E8F3FD"/>
            <path d="M332.231 190.074C336.212 185.336 340.949 178.736 336.93 178.253C333.198 177.805 330.732 183.689 329.34 188.583C328.931 188.428 328.509 188.295 328.075 188.182C329.383 182.226 329.219 174.046 326.766 175.371C324.722 176.476 324.886 182.844 325.332 187.74C322.902 187.546 320.243 187.775 317.579 188.146C317.004 184.732 315.741 179.985 313.334 179.882C310.878 179.777 313.689 184.902 315.885 188.397C315.373 188.478 314.865 188.561 314.358 188.646C313.429 187.216 312.043 185.622 310.55 185.765C309.017 185.912 310.896 187.549 312.769 188.915C306.289 190.015 300.624 190.932 299.269 187.251C296.663 180.17 287.968 167.813 279.008 167.046C270.048 166.278 247.557 188.863 232.679 186.021C181.284 176.206 156 204.004 156 204.004L231.766 203.201L344 203.635C344 203.635 340.095 195.077 332.231 190.074Z" fill="#A8D29F"/>
            <path d="M198.552 203.456C178.679 183.527 133.185 213.968 88.6546 186.346C84.2604 183.62 78.6499 176.108 61.1565 177.432C57.2861 177.724 53.9137 179.133 51.0072 181.149C49.1371 175.997 45.9607 170.22 41.2998 171.387C36.1279 172.684 42.4196 179.338 47.6091 183.953C47.2332 184.316 46.8669 184.687 46.5118 185.066C45.3212 184.1 43.5025 183.377 40.8403 183.975C37.063 184.824 41.3464 186.138 44.8521 186.964C38.9621 194.194 36.3191 203.247 36.3191 203.247L198.552 203.456Z" fill="#8EC181"/>
            <path d="M379.471 204.005H0.529224C0.237348 204.005 0 203.796 0 203.543V203.467C0 203.212 0.238951 203.005 0.529224 203.005H379.471C379.763 203.005 380 203.214 380 203.467V203.543C380 203.796 379.761 204.005 379.471 204.005Z" fill="#13375B"/>
            <path d="M119.039 187.521H107.086V202.973H77.6545V187.521H31V168.203L69.1721 112.83H100.275L66.3443 163.954H78.5542V150.175H107.086V163.954H119.039V187.521Z" fill="#FF5761"/>
            <path d="M123.277 155.872C123.277 125.995 140.242 108.739 164.019 108.739C187.796 108.739 204.76 125.995 204.76 155.872C204.76 185.747 187.796 203.005 164.019 203.005C140.241 203.005 123.277 185.747 123.277 155.872ZM174.3 155.872C174.3 138.487 169.931 133.077 164.019 133.077C158.107 133.077 153.737 138.487 153.737 155.872C153.737 173.257 158.107 178.666 164.019 178.666C169.931 178.666 174.3 173.257 174.3 155.872Z" fill="#FF5761"/>
            <path d="M299.348 187.521H287.395V202.973H257.963V187.521H211.309V168.203L249.481 112.83H280.582L246.653 163.954H258.863V150.175H287.394V163.954H299.347V187.521H299.348Z" fill="#FF5761"/>
            <path d="M334.606 193.277C342.465 182.937 340.469 168.171 330.148 160.297C319.827 152.423 305.089 154.423 297.23 164.764C289.371 175.105 291.367 189.87 301.688 197.744C312.009 205.618 326.747 203.618 334.606 193.277Z" fill="#F8914C"/>
            <path opacity="0.1" d="M338.85 184.13C337.111 191.891 322.966 200.444 309.664 191.735C296.31 182.989 298.026 163.791 309.76 156.305C299.809 159.01 292.47 168.105 292.433 178.942C292.396 191.935 302.879 202.505 315.848 202.542C327.094 202.587 336.512 194.7 338.85 184.13Z" fill="black"/>
            <path d="M331.215 170.446C334.647 171.803 337.422 175.146 339.397 178.318C339.375 177.673 339.338 177.036 339.264 176.398C337.289 173.552 334.699 170.802 331.562 169.557C329.047 168.563 326.45 168.63 323.831 169.757C323.136 168.919 322.411 168.097 321.634 167.274C320.961 166.562 320.295 165.917 319.629 165.31C325.703 162.56 329.772 162.523 333.382 163.271C333.02 162.863 332.635 162.478 332.243 162.1C328.721 161.581 324.667 161.922 318.852 164.628C317.75 163.694 316.655 162.886 315.567 162.204C318.682 160.291 320.08 158.283 319.91 155.829C319.592 155.777 319.274 155.726 318.956 155.688C319.148 157.564 318.26 159.55 314.643 161.648C311.091 159.602 307.666 158.765 304.5 158.461C304.026 158.72 303.567 159.002 303.124 159.298C306.423 159.461 309.974 160.143 313.681 162.174C310.418 163.849 306.897 164.591 303.479 165.302C300.556 165.917 297.73 166.503 295.348 167.667C295.082 168.156 294.83 168.66 294.593 169.171C297.087 167.615 300.312 166.94 303.671 166.236C307.333 165.473 311.114 164.672 314.643 162.737C315.723 163.39 316.81 164.168 317.913 165.08C309.553 169.364 299.173 180.816 298.389 194.677C298.685 195.01 298.988 195.329 299.299 195.64C299.632 181.55 310.322 169.861 318.697 165.747C319.444 166.407 320.191 167.126 320.946 167.926C321.649 168.675 322.322 169.423 322.951 170.179C315.087 174.315 314.739 185.582 314.384 197.493C314.332 199.139 314.28 200.807 314.214 202.482C314.524 202.504 314.842 202.519 315.161 202.534C315.235 200.858 315.286 199.176 315.338 197.53C315.693 185.819 316.026 174.745 323.58 170.943C330.068 179.007 332.539 187.62 331.059 197.026C331.437 196.708 331.807 196.374 332.162 196.033C333.323 186.879 330.778 178.451 324.475 170.543C326.761 169.616 329.025 169.579 331.215 170.446Z" fill="#455A64"/>
        </svg>
        <h2 className={s.h2}>Page Not Found</h2>
        <p className={s.p}>Sorry, we can’t find what you’re looking for</p>
    </div>
  )
}
