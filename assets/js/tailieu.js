// ======== 1. BIẾN CHUNG ========
const tabs = document.querySelectorAll("#categoryTabs .nav-link");
const cards = document.querySelectorAll(".course-card-wrapper"); 
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Các section dạng "tiêu đề + list" cần auto ẩn/hiện
const sections = [
  { titleId: "ngoainguTitle",  listId: "courseList"  },  
  { titleId: "kynangTitle",    listId: "courseList1" },  
  { titleId: "laptrinhTitle",  listId: "courseGrid1" },  
  { titleId: "thietkeTitle",   listId: "courseGrid2" },  
  { titleId: "khacTitle",      listId: "courseGrid3" },  
];

let currentCategory = "all"; // lưu tab đang chọn

// ======== 1.1. HÀM ẨN/HIỆN CẢ SECTION ========
function updateSectionsVisibility() {
  sections.forEach((sec) => {
    const titleEl = document.getElementById(sec.titleId);
    const listEl = document.getElementById(sec.listId);

    // Nếu HTML chưa có đúng id thì bỏ qua.
    if (!titleEl || !listEl) return;

    const sectionCards = listEl.querySelectorAll(".course-card-wrapper");
    const anyVisible = Array.from(sectionCards).some(
      (card) => card.style.display !== "none"
    );

    const displayValue = anyVisible ? "" : "none";

    // Ẩn/hiện tiêu đề + nội dung
    titleEl.style.display = displayValue;
    listEl.style.display = displayValue;

    // Ẩn/hiện gạch ngang ngay phía trên tiêu đề
    const divider = titleEl.previousElementSibling;
    if (divider && divider.classList.contains("section-divider")) {
      divider.style.display = displayValue;
    }
  });
}

// ======== 2. HÀM LỌC THEO CATEGORY + SEARCH ========
function filterByCategory() {
  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");

    // 1. Lọc theo tab
    const matchCategory =
      currentCategory === "all" || cardCat === currentCategory;

    // 2. Lọc theo từ khóa
    const titleEl = card.querySelector(".course-title");
    const descEl = card.querySelector(".course-desc");

    const title = titleEl ? titleEl.textContent.toLowerCase() : "";
    const desc = descEl ? descEl.textContent.toLowerCase() : "";

    const matchSearch =
    !keyword || title.includes(keyword);


    // 3. Kết quả cuối
    card.style.display = matchCategory && matchSearch ? "" : "none";
  });

  // 4. Cập nhật ẩn/hiện các block theo section
  updateSectionsVisibility();
}

// ======== 3. CLICK TAB ========
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // Active tab
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    // Lưu category
    currentCategory = this.getAttribute("data-category");

    // Lọc lại
    filterByCategory();
  });
});

// ======== 4. TÌM KIẾM ========
function doSearch() {
  filterByCategory();
}

if (searchBtn) {
  searchBtn.addEventListener("click", doSearch);
}

if (searchInput) {
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") doSearch();
  });
}

searchInput.addEventListener("input", doSearch);

// ======== 5. LẦN ĐẦU LOAD TRANG ========
filterByCategory();
