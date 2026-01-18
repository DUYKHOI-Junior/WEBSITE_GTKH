/* HIỆN / ẨN MENU LỌC */
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");

if (filterBtn && filterMenu) {
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation(); /* ngăn sự click bị tràn ra cha */
    filterMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    filterMenu.classList.remove("show");
  });

  filterMenu.addEventListener("click", (e) => e.stopPropagation());
}

/* XEM THÊM – MỖI LẦN HIỆN 4 CARD */
function showMore(button) {
  const section = button.closest(".course-section");
  const hidden = section.querySelectorAll(".hidden-course");

  hidden.forEach((card, index) => {
    if (index < 4) card.classList.remove("hidden-course");
  });

  if (section.querySelectorAll(".hidden-course").length === 0) {
    button.style.display = "none";
  }
}

/* ĐỌC TRẠNG THÁI BỘ LỌC */
function getFilterState() {
  const searchInput = document.querySelector(".search-bar input");
  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const checked = Array.from(
    document.querySelectorAll('.filter-option input[type="checkbox"]:checked'),
  );

  const tagValues = [];
  const levelValues = [];
  const topicValues = [];

  const levelList = ["beginner", "intermediate", "advanced", "expert", "all"];
  const topicList = ["web", "frontend", "backend", "design"];

  checked.forEach((cb) => {
    const v = cb.value.toLowerCase();

    if (levelList.includes(v)) {
      levelValues.push(v);
    } else if (topicList.includes(v)) {
      topicValues.push(v);
    } else {
      tagValues.push(v);
    }
  });

  const activeCatBtn = document.querySelector(
    ".course-categories button.active",
  );
  const category = activeCatBtn ? activeCatBtn.dataset.category : "all";

  return {
    searchText,
    tagValues,
    levelValues,
    topicValues,
    category,
  };
}

/*ÁP DỤNG BỘ LỌC + SEARCH + DANH MỤC */
function applyFilter() {
  const state = getFilterState();
  const sections = document.querySelectorAll(".course-section");
  let totalVisibleCards = 0;

  sections.forEach((section) => {
    const sectionCategory = section.dataset.category || "all";

    // ẩn hiện section theo danh mục
    if (state.category !== "all" && sectionCategory !== state.category) {
      section.classList.add("hidden-section");
      return;
    } else {
      section.classList.remove("hidden-section");
    }

    const cards = section.querySelectorAll(".course-card-new");

    cards.forEach((card) => {
      const title = (card.querySelector("h3")?.innerText || "").toLowerCase();
      const tagsStr = (card.dataset.tags || "").toLowerCase();
      const level = (card.dataset.level || "").toLowerCase();
      const topic = (card.dataset.topic || "").toLowerCase();

      if (state.searchText) {
        const inTitle = title.includes(state.searchText);
        const inTags = tagsStr.includes(state.searchText);
        if (!inTitle && !inTags) {
          card.classList.add("hide");
          return;
        }
      }

      const matchTag =
        state.tagValues.length === 0 ||
        state.tagValues.some((t) => tagsStr.includes(t));

      const matchLevel =
        state.levelValues.length === 0 ||
        level === "all" ||
        state.levelValues.includes(level);

      const matchTopic =
        state.topicValues.length === 0 || state.topicValues.includes(topic);

      if (matchTag && matchLevel && matchTopic) {
        card.classList.remove("hide");
        totalVisibleCards++;
      } else {
        card.classList.add("hide");
      }
    });
  });

  handleNoResult(totalVisibleCards);
}

/*  NÚT "LỌC" & "LÀM MỚI" */
document.querySelector(".btn-filter")?.addEventListener("click", () => {
  applyFilter();
  filterMenu?.classList.remove("show");
});

document.querySelector(".btn-reset")?.addEventListener("click", () => {
  // bỏ chọn checkbox
  document
    .querySelectorAll('.filter-option input[type="checkbox"]')
    .forEach((cb) => (cb.checked = false));
});

/* SEARCH REALTIME */
document
  .querySelector(".search-bar input")
  ?.addEventListener("input", applyFilter);

/*  MENU DANH MỤC (CATEGORY TABS) */
const categoryButtons = document.querySelectorAll(".course-categories button");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter();
  });
});
