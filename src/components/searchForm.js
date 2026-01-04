"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const POPULAR_KEYWORDS = ["말티즈", "시바견", "말티푸", "푸들", "코리안숏헤어", "페르시안", "러시안 블루", "금붕어", "구피", "플래티", "코리도라스", "왕관앵무", "모란앵무", "사랑앵무", "회색앵무", "드워프 햄스터", "로보로브스키 햄스터", "골든 햄스터", "캠벨 햄스터"];

export default function SearchForm() {
  const [selectedCategory, setSelectedCategory] = useState("입양하기");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["입양하기", "임시보호", "봉사활동", "후원하기", "커뮤니티"];
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownContainer = event.target.closest('.relative');
      if (isDropdownOpen && !dropdownContainer) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 반응형에서 드롭다운 열릴 때 스크롤 고정
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth < 1200;
    
    if (isDropdownOpen && isMobile) {
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
  }, [isDropdownOpen]);

  // 스와이퍼 기능을 위한 이벤트 핸들러 (모바일만)
  const handleMouseDown = (e) => {
    // PC에서는 작동하지 않도록 막기
    if (typeof window !== 'undefined' && window.innerWidth >= 1200) return;
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.userSelect = '';
  };

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return;
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.userSelect = '';
  };

  const handleMouseMove = (e) => {
    // PC에서는 작동하지 않도록 막기
    if (typeof window !== 'undefined' && window.innerWidth >= 1200) return;
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // 스크롤 속도 조절
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <>
      {/* Dimmed 배경 (반응형에서만) */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      {/* 검색폼 컨테이너 */}
      <div className="max-w-[800px] mx-auto flex flex-col">
        {/* 검색폼 */}
        <div className="flex items-center w-full">
          <div className="relative w-full">
        <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
          <button 
            type="button"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="bg-transparent px-[16px] py-[12px] flex items-center gap-[4px] font-medium leading-[1.5] cursor-pointer"
          >
            <span>{selectedCategory}</span>
            <img src="/images/search-btn-expand.svg" alt="expand" className="w-[12px] h-[12px]" />
          </button>
          <div className="h-[20px] w-[1px] bg-gray-300"></div>
          <div className="flex-1 relative flex items-center">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력해주세요." 
              className="w-full px-[16px] py-[12px] border-0 focus:outline-none text-[16px] leading-[1.5] text-[#666] font-medium placeholder:text-[#666] placeholder:opacity-0 md:placeholder:opacity-100 focus:placeholder:opacity-0"
            />
            <div className="absolute right-[8px] flex items-center gap-[8px]">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-[4px] text-[#666] transition-colors duration-200 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <img src="/images/search-btn.svg" alt="search" className="w-[30px] h-[30px]" />
            </div>
          </div>
        </div>
        {/* PC용 드롭다운 (위에서 나타남) */}
        <ul className={`absolute top-full left-[12px] bg-white rounded-lg shadow-lg z-50 w-auto whitespace-nowrap overflow-hidden p-[6px] transition-opacity duration-300 hidden lg:block ${
          isDropdownOpen ? 'lg:opacity-100 lg:visible lg:pointer-events-auto' : 'lg:opacity-0 lg:invisible lg:pointer-events-none'
        }`}>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-[16px] py-[12px] hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap text-[14px] leading-[1.5] ${
                  selectedCategory === category ? 'font-medium' : 'text-[#666]'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      {/* 인기검색어 */}
      <div className="pt-[14px] md:pt-[16px] lg:pt-[20px] pb-[14px] md:pb-[16px] lg:pb-[20px] -mr-[20px] md:-mr-[24px] lg:mr-0">
        <div className="flex items-center gap-[16px]">
          <span className="text-[14px] leading-[1.5] text-[#333] font-medium whitespace-nowrap">인기검색어</span>
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-[10px] flex-nowrap overflow-x-auto scroll-smooth lg:cursor-default"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {POPULAR_KEYWORDS.map((keyword, index) => (
              <Link
                key={index}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="text-[14px] leading-[1.5] text-[#666] transition-colors duration-200 whitespace-nowrap flex-shrink-0 px-[4px] py-[2px]"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
      {/* 반응형용 하단 리스트 (밑에서 올라옴) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg z-50 lg:hidden transform transition-transform duration-300 ${
        isDropdownOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="py-[10px]">
          <ul className="space-y-[8px]">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-[16px] py-[12px] rounded-lg transition-colors duration-200 text-[16px] leading-[1.5] flex items-center justify-between ${
                    selectedCategory === category 
                      ? 'font-medium text-green-500' 
                      : 'text-[#666] hover:bg-gray-50'
                  }`}
                >
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <img src="/images/respond-search-btn-expand.svg" alt="selected" className="w-[16px] h-[16px]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

