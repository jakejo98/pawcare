"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴가 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // 스크롤 위치 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleHamburgerClick = () => {
    if (!isMobileMenuOpen) {
      // 메뉴 열기: 버튼이 X로 바뀐 후 메뉴 표시
      setIsMobileMenuOpen(true);
    } else {
      // 메뉴 닫기: 메뉴가 사라진 후 버튼이 햄버거로 바뀜
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`py-[12px] md:py-[16px] lg:py-[20px] px-[20px] md:px-[24px] flex justify-between items-center fixed top-0 left-0 w-full z-50 lg:static bg-white lg:shadow-none ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* 로고 */}
      <h1>
        <Link href="/" className="cursor-pointer">
          <img src="/images/logo.svg" alt="logo" className="w-[140px] h-[40px] md:w-[170px] md:h-[49px] lg:w-[209px] lg:h-[60px]" />
        </Link>
      </h1>

      {/* 햄버거 메뉴 버튼 - 반응형 */}
      <button
        onClick={handleHamburgerClick}
        className="lg:hidden p-1 z-[60]"
      >
        <img
          src={isMobileMenuOpen ? "/images/hamburger-close-btn.svg" : "/images/hamburger-expand-btn.svg"}
          alt={isMobileMenuOpen ? "close menu" : "open menu"}
          className="w-8 h-8"
        />
      </button>

       {/* 네비게이션 - 데스크탑*/}
       <nav className="hidden lg:block">
         <ul className="flex">
          {/* depth1 */}
           <li className="group relative">
             <button 
               onMouseEnter={() => setActiveMenu('adopt')}
               onMouseLeave={() => setActiveMenu(null)}
               className="inline-flex items-center gap-[4px] pt-[8px] pr-[4px] pb-[8px] pl-[12px] font-bold lg:text-[16px] leading-[1.5] bg-transparent border-none cursor-pointer group/btn">
               <Link href="/" className={`font-bold lg:text-[16px] leading-[1.5] transition-colors duration-200 ${activeMenu === 'adopt' ? 'text-green-500' : activeMenu && activeMenu !== 'adopt' ? 'text-gray-400' : 'group-hover/btn:text-green-500'}`}>입양하기</Link>
               <img src="/images/nav-expand.svg" alt="" className="w-[16px] h-[16px]" />
             </button>
             {/* depth2 */}
             <ul className="absolute top-full left-0 bg-white rounded-[6px] z-10 min-w-full w-max overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0 py-[6px] px-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">입양 가능한 아이들</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">입양 절차 안내</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">입양 조건 및 책임</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">입양 후기</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">입양 FAQ</Link>
               </li>
             </ul>
           </li>
          {/* depth1 */}
           <li className="group relative">
             <button 
               onMouseEnter={() => setActiveMenu('foster')}
               onMouseLeave={() => setActiveMenu(null)}
               className="inline-flex items-center gap-[4px] pt-[8px] pr-[4px] pb-[8px] pl-[12px] font-bold lg:text-[16px] leading-[1.5] bg-transparent border-none cursor-pointer group/btn">
               <Link href="/" className={`font-bold lg:text-[16px] leading-[1.5] transition-colors duration-200 ${activeMenu === 'foster' ? 'text-green-500' : activeMenu && activeMenu !== 'foster' ? 'text-gray-400' : 'group-hover/btn:text-green-500'}`}>임시보호</Link>
               <img src="/images/nav-expand.svg" alt="" className="w-[16px] h-[16px]" />
             </button>
              {/* depth2 */}
              <ul className="absolute top-full left-0 bg-white rounded-[6px] z-10 min-w-full w-max overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0 py-[6px] px-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">임시보호란?</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">임시보호 중인 아이들</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">임시보호 신청하기</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">임시보호 후기</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">임시보호 FAQ</Link>
               </li>
             </ul>
           </li>
          {/* depth1 */}
           <li className="group relative">
             <button 
               onMouseEnter={() => setActiveMenu('volunteer')}
               onMouseLeave={() => setActiveMenu(null)}
               className="inline-flex items-center gap-[4px] pt-[8px] pr-[4px] pb-[8px] pl-[12px] font-bold lg:text-[16px] leading-[1.5] bg-transparent border-none cursor-pointer group/btn">
               <Link href="/" className={`font-bold lg:text-[16px] leading-[1.5] transition-colors duration-200 ${activeMenu === 'volunteer' ? 'text-green-500' : activeMenu && activeMenu !== 'volunteer' ? 'text-gray-400' : 'group-hover/btn:text-green-500'}`}>봉사활동</Link>
               <img src="/images/nav-expand.svg" alt="" className="w-[16px] h-[16px]" />
             </button>
             {/* depth2 */}
             <ul className="absolute top-full left-0 bg-white rounded-[6px] z-10 min-w-full w-max overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0 py-[6px] px-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">봉사활동 안내</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">봉사 일정</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">봉사 신청하기</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">봉사 후기</Link>
               </li>
               <li className="hover:bg-gray-100 transition-colors duration-200">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">봉사 FAQ</Link>
               </li>
             </ul>
           </li>
          {/* depth1 */}
           <li className="group relative">
             <button 
               onMouseEnter={() => setActiveMenu('donate')}
               onMouseLeave={() => setActiveMenu(null)}
               className="inline-flex items-center gap-[4px] pt-[8px] pr-[4px] pb-[8px] pl-[12px] font-bold lg:text-[16px] leading-[1.5] bg-transparent border-none cursor-pointer group/btn">
               <Link href="/" className={`font-bold lg:text-[16px] leading-[1.5] transition-colors duration-200 ${activeMenu === 'donate' ? 'text-green-500' : activeMenu && activeMenu !== 'donate' ? 'text-gray-400' : 'group-hover/btn:text-green-500'}`}>후원하기</Link>
               <img src="/images/nav-expand.svg" alt="" className="w-[16px] h-[16px]" />
             </button>
             {/* depth2 */}
             <ul className="absolute top-full left-0 bg-white rounded-[6px] z-10 min-w-full w-max overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-[-10px] group-hover:translate-y-0 py-[6px] px-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
               <li className="hover:bg-gray-100">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">정기 후원</Link>
               </li>
               <li className="hover:bg-gray-100">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">일시 후원</Link>
               </li>
               <li className="hover:bg-gray-100">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">물품 후원</Link>
               </li>
               <li className="hover:bg-gray-100">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">후원금 사용 내역</Link>
               </li>
               <li className="hover:bg-gray-100">
                 <Link href="/" className="block py-[8px] px-[12px] lg:text-[16px] leading-[1.5] whitespace-nowrap text-[#666]">후원 후기</Link>
               </li>
             </ul>
           </li>
           {/* depth1 */}
           <li>
             <button 
               onMouseEnter={() => setActiveMenu('community')}
               onMouseLeave={() => setActiveMenu(null)}
               className="inline-flex items-center gap-[4px] pt-[8px] pr-[4px] pb-[8px] pl-[12px] font-bold lg:text-[16px] leading-[1.5] bg-transparent border-none cursor-pointer group/btn">
               <Link href="/" className={`font-bold lg:text-[16px] leading-[1.5] transition-colors duration-200 ${activeMenu === 'community' ? 'text-green-500' : activeMenu && activeMenu !== 'community' ? 'text-gray-400' : 'group-hover/btn:text-green-500'}`}>커뮤니티</Link>
             </button>
           </li>
         </ul>
       </nav>

       {/* 네비게이션 - 반응형 */}
       <div className={`lg:hidden fixed top-[64px] md:top-[81px] left-0 w-full bg-white shadow-lg transform z-[60] ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible pointer-events-auto transition-all duration-300 ease-out' : '-translate-y-full opacity-0 invisible pointer-events-none transition-all duration-500 ease-in'}`}>
         <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-81px)] overflow-y-auto px-5 pb-10 md:px-6 md:pb-12">
           <nav>
             <ul className="space-y-4">
               {/* 입양하기 */}
               <li>
                 <button
                   onClick={() => toggleMenu('adopt')}
                   className={`w-full flex items-center justify-between font-bold text-lg md:text-xl py-2 md:py-2.5 transition-colors ${expandedMenus.adopt ? 'text-green-500' : 'hover:text-green-500'}`}
                 >
                   <span>입양하기</span>
                   <img
                     src={`/images/${expandedMenus.adopt ? 'hamburger-list-close' : 'hamburger-list-expand'}.svg`}
                     alt=""
                     className="w-[16px] h-[16px]"
                   />
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${expandedMenus.adopt ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="space-y-2">
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>입양 가능한 아이들</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>입양 절차 안내</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>입양 조건 및 책임</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>입양 후기</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>입양 FAQ</Link></li>
                   </ul>
                 </div>
               </li>

               {/* 임시보호 */}
               <li>
                 <button
                   onClick={() => toggleMenu('foster')}
                   className={`w-full flex items-center justify-between font-bold text-lg md:text-xl py-2 md:py-2.5 transition-colors ${expandedMenus.foster ? 'text-green-500' : 'hover:text-green-500'}`}
                 >
                   <span>임시보호</span>
                   <img
                     src={`/images/${expandedMenus.foster ? 'hamburger-list-close' : 'hamburger-list-expand'}.svg`}
                     alt=""
                     className="w-[16px] h-[16px]"
                   />
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${expandedMenus.foster ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="space-y-2">
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>임시보호란?</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>임시보호 중인 아이들</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>임시보호 신청하기</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>임시보호 후기</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>임시보호 FAQ</Link></li>
                   </ul>
                 </div>
               </li>

               {/* 봉사활동 */}
               <li>
                 <button
                   onClick={() => toggleMenu('volunteer')}
                   className={`w-full flex items-center justify-between font-bold text-lg md:text-xl py-2 md:py-2.5 transition-colors ${expandedMenus.volunteer ? 'text-green-500' : 'hover:text-green-500'}`}
                 >
                   <span>봉사활동</span>
                   <img
                     src={`/images/${expandedMenus.volunteer ? 'hamburger-list-close' : 'hamburger-list-expand'}.svg`}
                     alt=""
                     className="w-[16px] h-[16px]"
                   />
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${expandedMenus.volunteer ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="space-y-2">
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>봉사활동 안내</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>봉사 일정</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>봉사 신청하기</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>봉사 후기</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>봉사 FAQ</Link></li>
                   </ul>
                 </div>
               </li>

               {/* 후원하기 */}
               <li>
                 <button
                   onClick={() => toggleMenu('donate')}
                   className={`w-full flex items-center justify-between font-bold text-lg md:text-xl py-2 md:py-2.5 transition-colors ${expandedMenus.donate ? 'text-green-500' : 'hover:text-green-500'}`}
                 >
                   <span>후원하기</span>
                   <img
                     src={`/images/${expandedMenus.donate ? 'hamburger-list-close' : 'hamburger-list-expand'}.svg`}
                     alt=""
                     className="w-[16px] h-[16px]"
                   />
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${expandedMenus.donate ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="space-y-2">
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>정기 후원</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>일시 후원</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>물품 후원</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>후원금 사용 내역</Link></li>
                     <li><Link href="/" className="text-[#666] hover:text-green-500 transition-colors block py-[8px] md:py-[10px]" onClick={() => setIsMobileMenuOpen(false)}>후원 후기</Link></li>
                   </ul>
                 </div>
               </li>

               {/* 커뮤니티 */}
               <li>
                 <Link href="/" className="font-bold text-lg md:text-xl hover:text-green-500 transition-colors block py-2 md:py-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                   커뮤니티
                 </Link>
               </li>
             </ul>
           </nav>
         </div>
       </div>
    </header>
  );
}
