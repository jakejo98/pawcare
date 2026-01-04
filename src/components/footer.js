import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-[40px] md:py-[48px] lg:py-[64px]">
      {/* footer-top */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-[40px] lg:gap-0">
          {/* footer-top-left */}
          <div className="lg:min-w-[500px]">
          <img src="/images/logo.svg" alt="logo" className="inline-block mb-[20px] w-[105px] h-[30px]" />
          <ul className="flex">
            <li className="mr-[10px]">
              <Link href="/">
                <img src="/images/sns-facebook.svg" alt="Facebook" className="w-[30px] h-[30px]" />
              </Link>
            </li>
            <li className="mr-[10px]">
              <Link href="/">
                <img src="/images/sns-instagram.svg" alt="Instagram" className="w-[30px] h-[30px]" />
              </Link>
            </li>
            <li className="mr-[10px]">
              <Link href="/">
                <img src="/images/sns-youtube.svg" alt="YouTube" className="w-[30px] h-[30px]" />
              </Link>
            </li>
          </ul>
        </div>
        {/* footer-top-right */}
        <div className="flex-1">
           <ul className="flex flex-col lg:flex-row w-full gap-[30px] lg:gap-0">
            {/* depth1 */}
             <li className="w-full lg:w-1/4">
               <span className="text-[16px] leading-[1.5] font-bold inline-block mb-[12px]">회사</span>
               {/* depth2 */}
               <ul className="flex flex-col gap-[8px]">
                <li>
                  <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">회사 소개</Link>
                </li>
                <li>
                  <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">서비스 소개</Link>
                </li>
                <li>
                  <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">블로그</Link>
                </li>
                <li>
                  <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">채용</Link>
                </li>
              </ul>
             </li>
            {/* depth1 */}
             <li className="w-full lg:w-1/4">
             <span className="text-[16px] leading-[1.5] font-bold inline-block mb-[12px]">탐색</span>
               {/* depth2 */}
               <ul className="flex flex-col gap-[8px]">
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">입양하기</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">임시보호</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">봉사활동</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">후원하기</Link>
                 </li>
               </ul>
             </li>
             {/* depth1 */}
             <li className="w-full lg:w-1/4">
             <span className="text-[16px] leading-[1.5] font-bold inline-block mb-[12px]">비즈니스</span>
               {/* depth2 */}
               <ul className="flex flex-col gap-[8px]">
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">비즈니스 소개</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">광고 문의</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">제휴 문의</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">파트너십</Link>
                 </li>
               </ul>
             </li>
             {/* depth1 */}
             <li className="w-full lg:w-1/4">
              <span className="text-[16px] leading-[1.5] font-bold inline-block mb-[12px]">문의</span>
               {/* depth2 */}
               <ul className="flex flex-col gap-[8px]">
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">고객센터</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">FAQ</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">공지사항</Link>
                 </li>
                 <li>
                   <Link href="/" className="block text-[14px] text-[#666] transition-colors duration-200">문의하기</Link>
                 </li>
               </ul>
             </li>
           </ul>
        </div>
      </div>
      {/* footer-border */}
      <div className="w-full h-[1px] my-[28px] md:my-[32px] lg:my-[40px] bg-gray-300"></div>
       {/* footer-bottom */}
       <div>
        {/* footer-address */}
          <address className="not-italic text-[14px] leading-[20px] text-[#666]">
           <p><span className="font-bold">포우케어</span></p>
           <p><span className="font-bold">제작자</span> 조재형 | <span className="font-bold">사업자번호</span> xxx-xxx-xxxxx</p>
           <p><span className="font-bold">호스팅 사업자</span> Github</p>
           <p><span className="font-bold">주소</span> 서울시 구로구 개봉동</p>
           <p><span className="font-bold">전화</span> <a href="tel:1234-5678">1234-5678</a> | <span className="font-bold">고객문의</span> <a href="mailto:jakejo@kakao.com" className="transition-colors duration-200">jakejo@kakao.com</a></p>
         </address>
       </div>
       {/* footer-link */}
       <div className="mt-[30px]">
        <ul className="flex gap-[10px] flex-wrap">
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">이용약관</Link>
          </li>
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">개인정보처리방침</Link>
          </li>
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">운영정책</Link>
          </li>
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">위치기반서비스 이용약관</Link>
          </li>
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">이용자보호 비전과 계획</Link>
          </li>
          <li>
            <Link href="/" className="text-[14px] leading-[20px] font-medium text-[#666]">청소년보호정책</Link>
          </li>
        </ul>
       </div>
    </footer>
  );
}