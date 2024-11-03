interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  onIconClick?: () => void;
  isSelected?: string | null;
}

const FlatmatesIcon: React.FC<SVGProps> = ({ className, onIconClick, isSelected }) => (
  <svg
    className={className}
    width="108" height="78" viewBox="0 0 108 78" fill="none" xmlns="http://www.w3.org/2000/svg"
    onClick={onIconClick}
  >
    <path d="M63.2957 38.1237H44.703C43.316 38.1237 42.1875 36.9953 42.1875 35.6083V22.3735C42.1875 21.8903 42.5792 21.4985 43.0625 21.4985C43.5457 21.4985 43.9374 21.8903 43.9374 22.3735V35.6083C43.9374 36.0304 44.2808 36.3738 44.703 36.3738H63.2957C63.7179 36.3738 64.0613 36.0304 64.0613 35.6083V22.3735C64.0613 21.8903 64.453 21.4985 64.9363 21.4985C65.4195 21.4985 65.8112 21.8903 65.8112 22.3735V35.6083C65.8112 36.9953 64.6828 38.1237 63.2957 38.1237Z" fill={isSelected == 'flatmates' ? "#216B9B" : "currentColor"}/>
<path d="M67.125 25.4352C66.9011 25.4352 66.6772 25.3497 66.5064 25.1789L55.6247 14.2973C54.7293 13.4018 53.2722 13.4018 52.3767 14.2973L41.4951 25.1789C41.1534 25.5206 40.5994 25.5206 40.2578 25.1789C39.916 24.8372 39.916 24.2832 40.2578 23.9416L51.1393 13.0599C52.7171 11.4822 55.2844 11.4822 56.8621 13.0599L67.7437 23.9415C68.0854 24.2832 68.0854 24.8372 67.7437 25.1789C67.5729 25.3497 67.3489 25.4352 67.125 25.4352Z" fill={isSelected == 'flatmates' ? "#216B9B" : "currentColor"}/>
<path d="M47 33H62M47 28.625C47 29.0891 47.1756 29.5342 47.4882 29.8624C47.8007 30.1906 48.2246 30.375 48.6667 30.375C49.1087 30.375 49.5326 30.1906 49.8452 29.8624C50.1577 29.5342 50.3333 29.0891 50.3333 28.625C50.3333 28.1609 50.1577 27.7158 49.8452 27.3876C49.5326 27.0594 49.1087 26.875 48.6667 26.875C48.2246 26.875 47.8007 27.0594 47.4882 27.3876C47.1756 27.7158 47 28.1609 47 28.625ZM52.8333 30.375H62V28.625C62 27.9288 61.7366 27.2611 61.2678 26.7688C60.7989 26.2766 60.163 26 59.5 26H52.8333V30.375Z" stroke={isSelected == 'flatmates' ? "#216B9B" : "currentColor"} stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.2578 56.0469V66H25.542V56.0469H27.2578ZM31.3184 60.4014V61.7617H26.8203V60.4014H31.3184ZM31.8857 56.0469V57.4141H26.8203V56.0469H31.8857ZM34.8525 55.5V66H33.1982V55.5H34.8525ZM40.8271 64.5166V60.9893C40.8271 60.7249 40.7793 60.4971 40.6836 60.3057C40.5879 60.1143 40.4421 59.9661 40.2461 59.8613C40.0547 59.7565 39.8132 59.7041 39.5215 59.7041C39.2526 59.7041 39.0202 59.7497 38.8242 59.8408C38.6283 59.932 38.4756 60.055 38.3662 60.21C38.2568 60.3649 38.2021 60.5404 38.2021 60.7363H36.5615C36.5615 60.4447 36.6322 60.1621 36.7734 59.8887C36.9147 59.6152 37.1198 59.3714 37.3887 59.1572C37.6576 58.943 37.9788 58.7744 38.3525 58.6514C38.7262 58.5283 39.1455 58.4668 39.6104 58.4668C40.1663 58.4668 40.6585 58.5602 41.0869 58.7471C41.5199 58.9339 41.8594 59.2165 42.1055 59.5947C42.3561 59.9684 42.4814 60.4378 42.4814 61.0029V64.291C42.4814 64.6283 42.5042 64.9313 42.5498 65.2002C42.5999 65.4645 42.6706 65.6947 42.7617 65.8906V66H41.0732C40.9958 65.8223 40.9342 65.5967 40.8887 65.3232C40.8477 65.0452 40.8271 64.7764 40.8271 64.5166ZM41.0664 61.502L41.0801 62.5205H39.8975C39.5921 62.5205 39.3232 62.5501 39.0908 62.6094C38.8584 62.6641 38.6647 62.7461 38.5098 62.8555C38.3548 62.9648 38.2386 63.097 38.1611 63.252C38.0837 63.4069 38.0449 63.5824 38.0449 63.7783C38.0449 63.9743 38.0905 64.1543 38.1816 64.3184C38.2728 64.4779 38.4049 64.6032 38.5781 64.6943C38.7559 64.7855 38.9701 64.8311 39.2207 64.8311C39.5579 64.8311 39.8519 64.7627 40.1025 64.626C40.3577 64.4847 40.5583 64.3138 40.7041 64.1133C40.8499 63.9082 40.9274 63.7145 40.9365 63.5322L41.4697 64.2637C41.415 64.4505 41.3216 64.651 41.1895 64.8652C41.0573 65.0794 40.8841 65.2845 40.6699 65.4805C40.4603 65.6719 40.2074 65.8291 39.9111 65.9521C39.6195 66.0752 39.2822 66.1367 38.8994 66.1367C38.4163 66.1367 37.9857 66.041 37.6074 65.8496C37.2292 65.6536 36.9329 65.3916 36.7188 65.0635C36.5046 64.7308 36.3975 64.3548 36.3975 63.9355C36.3975 63.5436 36.4704 63.1973 36.6162 62.8965C36.7666 62.5911 36.9854 62.3359 37.2725 62.1309C37.5641 61.9258 37.9196 61.7708 38.3389 61.666C38.7581 61.5566 39.2367 61.502 39.7744 61.502H41.0664ZM47.5947 58.6035V59.8066H43.4248V58.6035H47.5947ZM44.6279 56.792H46.2754V63.9561C46.2754 64.1839 46.3073 64.3594 46.3711 64.4824C46.4395 64.6009 46.5329 64.6807 46.6514 64.7217C46.7699 64.7627 46.9089 64.7832 47.0684 64.7832C47.1823 64.7832 47.2917 64.7764 47.3965 64.7627C47.5013 64.749 47.5856 64.7354 47.6494 64.7217L47.6562 65.9795C47.5195 66.0205 47.36 66.057 47.1777 66.0889C47 66.1208 46.7949 66.1367 46.5625 66.1367C46.1842 66.1367 45.8493 66.0706 45.5576 65.9385C45.266 65.8018 45.0381 65.5807 44.874 65.2754C44.71 64.9701 44.6279 64.5645 44.6279 64.0586V56.792ZM53.2139 56.0469H54.7451L57.623 63.7236L60.4941 56.0469H62.0254L58.2246 66H57.0078L53.2139 56.0469ZM52.5166 56.0469H53.9727L54.2256 62.6914V66H52.5166V56.0469ZM61.2666 56.0469H62.7295V66H61.0137V62.6914L61.2666 56.0469ZM68.7725 64.5166V60.9893C68.7725 60.7249 68.7246 60.4971 68.6289 60.3057C68.5332 60.1143 68.3874 59.9661 68.1914 59.8613C68 59.7565 67.7585 59.7041 67.4668 59.7041C67.1979 59.7041 66.9655 59.7497 66.7695 59.8408C66.5736 59.932 66.4209 60.055 66.3115 60.21C66.2021 60.3649 66.1475 60.5404 66.1475 60.7363H64.5068C64.5068 60.4447 64.5775 60.1621 64.7188 59.8887C64.86 59.6152 65.0651 59.3714 65.334 59.1572C65.6029 58.943 65.9242 58.7744 66.2979 58.6514C66.6715 58.5283 67.0908 58.4668 67.5557 58.4668C68.1117 58.4668 68.6038 58.5602 69.0322 58.7471C69.4652 58.9339 69.8047 59.2165 70.0508 59.5947C70.3014 59.9684 70.4268 60.4378 70.4268 61.0029V64.291C70.4268 64.6283 70.4495 64.9313 70.4951 65.2002C70.5452 65.4645 70.6159 65.6947 70.707 65.8906V66H69.0186C68.9411 65.8223 68.8796 65.5967 68.834 65.3232C68.793 65.0452 68.7725 64.7764 68.7725 64.5166ZM69.0117 61.502L69.0254 62.5205H67.8428C67.5374 62.5205 67.2686 62.5501 67.0361 62.6094C66.8037 62.6641 66.61 62.7461 66.4551 62.8555C66.3001 62.9648 66.1839 63.097 66.1064 63.252C66.029 63.4069 65.9902 63.5824 65.9902 63.7783C65.9902 63.9743 66.0358 64.1543 66.127 64.3184C66.2181 64.4779 66.3503 64.6032 66.5234 64.6943C66.7012 64.7855 66.9154 64.8311 67.166 64.8311C67.5033 64.8311 67.7972 64.7627 68.0479 64.626C68.3031 64.4847 68.5036 64.3138 68.6494 64.1133C68.7952 63.9082 68.8727 63.7145 68.8818 63.5322L69.415 64.2637C69.3604 64.4505 69.2669 64.651 69.1348 64.8652C69.0026 65.0794 68.8294 65.2845 68.6152 65.4805C68.4056 65.6719 68.1527 65.8291 67.8564 65.9521C67.5648 66.0752 67.2275 66.1367 66.8447 66.1367C66.3617 66.1367 65.931 66.041 65.5527 65.8496C65.1745 65.6536 64.8783 65.3916 64.6641 65.0635C64.4499 64.7308 64.3428 64.3548 64.3428 63.9355C64.3428 63.5436 64.4157 63.1973 64.5615 62.8965C64.7119 62.5911 64.9307 62.3359 65.2178 62.1309C65.5094 61.9258 65.8649 61.7708 66.2842 61.666C66.7035 61.5566 67.182 61.502 67.7197 61.502H69.0117ZM75.54 58.6035V59.8066H71.3701V58.6035H75.54ZM72.5732 56.792H74.2207V63.9561C74.2207 64.1839 74.2526 64.3594 74.3164 64.4824C74.3848 64.6009 74.4782 64.6807 74.5967 64.7217C74.7152 64.7627 74.8542 64.7832 75.0137 64.7832C75.1276 64.7832 75.237 64.7764 75.3418 64.7627C75.4466 64.749 75.5309 64.7354 75.5947 64.7217L75.6016 65.9795C75.4648 66.0205 75.3053 66.057 75.123 66.0889C74.9453 66.1208 74.7402 66.1367 74.5078 66.1367C74.1296 66.1367 73.7946 66.0706 73.5029 65.9385C73.2113 65.8018 72.9834 65.5807 72.8193 65.2754C72.6553 64.9701 72.5732 64.5645 72.5732 64.0586V56.792ZM80.0723 66.1367C79.5254 66.1367 79.0309 66.0479 78.5889 65.8701C78.1514 65.6878 77.7777 65.4349 77.4678 65.1113C77.1624 64.7878 76.9277 64.4072 76.7637 63.9697C76.5996 63.5322 76.5176 63.0605 76.5176 62.5547V62.2812C76.5176 61.7025 76.6019 61.1784 76.7705 60.709C76.9391 60.2396 77.1738 59.8385 77.4746 59.5059C77.7754 59.1686 78.1309 58.9111 78.541 58.7334C78.9512 58.5557 79.3955 58.4668 79.874 58.4668C80.4027 58.4668 80.8652 58.5557 81.2617 58.7334C81.6582 58.9111 81.9863 59.1618 82.2461 59.4854C82.5104 59.8044 82.7064 60.1849 82.834 60.627C82.9661 61.069 83.0322 61.5566 83.0322 62.0898V62.7939H77.3174V61.6113H81.4053V61.4814C81.3962 61.1852 81.3369 60.9072 81.2275 60.6475C81.1227 60.3877 80.9609 60.1781 80.7422 60.0186C80.5234 59.859 80.2318 59.7793 79.8672 59.7793C79.5938 59.7793 79.3499 59.8385 79.1357 59.957C78.9261 60.071 78.7507 60.2373 78.6094 60.4561C78.4681 60.6748 78.3587 60.9391 78.2812 61.249C78.2083 61.5544 78.1719 61.8984 78.1719 62.2812V62.5547C78.1719 62.8783 78.2152 63.179 78.3018 63.457C78.3929 63.7305 78.5251 63.9697 78.6982 64.1748C78.8714 64.3799 79.0811 64.5417 79.3271 64.6602C79.5732 64.7741 79.8535 64.8311 80.168 64.8311C80.5645 64.8311 80.9176 64.7513 81.2275 64.5918C81.5374 64.4323 81.8063 64.2067 82.0342 63.915L82.9023 64.7559C82.7428 64.9883 82.5355 65.2116 82.2803 65.4258C82.0251 65.6354 81.7129 65.8063 81.3438 65.9385C80.9792 66.0706 80.5553 66.1367 80.0723 66.1367Z" fill={isSelected == 'flatmates' ? "#216B9B" : "currentColor"}/>
  </svg>
);

export default FlatmatesIcon;
