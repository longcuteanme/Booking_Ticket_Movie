import { createTypes } from "reduxsauce";

//types cua danhSachBannerReducer
export const danhSachBannerTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "danhSachBanner" }
);

//types cua danhSachCumRapTheoHeThongReducer
export const danhSachCumRapTheoHeThongTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "danhSachCumRapTheoHeThong" }
);

//types cua danhSachLichChieuTheoHeThongReducer
export const danhSachLichChieuTheoHeThongTypes = createTypes(
  `
    GET
    CHANGE_INDEX
    GET_SAGA
`,
  { prefix: "danhSachLichChieuTheoHeThong" }
);

//types cua danhSachPhimReducer
export const danhSachPhimTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "danhSachPhim" }
);

//types cua danhSachPhongVeReducer
export const danhSachPhongVeTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "danhSachPhongVe" }
);

//types cua loadingReducer
export const loadingTypes = createTypes(
  `
    DISPLAY
    HIDE
`,
  { prefix: "loading" }
);

//types cua loadingTablePhimReducer
export const loadingTablePhimTypes = createTypes(
  `
    DISPLAY
    HIDE
`,
  { prefix: "loadingTablePhim" }
);

//types cua loadingTableQuanTriReducer
export const loadingTableQuanTriTypes = createTypes(
  `
    DISPLAY
    HIDE
`,
  { prefix: "loadingTableQuanTri" }
);

//types cua localeReducer
export const localeTypes = createTypes(
  `
    CHANGE
`,
  { prefix: "locale" }
);

//types cua menuQuanTriReducer
export const menuQuanTriTypes = createTypes(
  `
    SET
`,
  { prefix: "menuQuanTri" }
);

//types cua modalReducer
export const modalTypes = createTypes(
  `
    OPEN
    CLOSE
`,
  { prefix: "modal" }
);

//types cua quanTriNguoiDungReducer
export const quanTriNguoiDungTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "quanTriNguoiDung" }
);

//types cua quanTriPhimReducer
export const quanTriPhimTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "quanTriPhim" }
);

//types cua thongTinHeThongRapReducer
export const thongTinHeThongRapTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "thongTinHeThongRap" }
);

//types cua thongTinPhimReducer
export const thongTinPhimTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "thongTinPhim" }
);

//types cua  thongTinTaiKhoanReducer
export const thongTinTaiKhoanTypes = createTypes(
  `
    GET
    GET_SAGA
`,
  { prefix: "thongTinTaiKhoan" }
);

//types cua  alertReducer
export const alertTypes = createTypes(
  `
    OPEN
    CLOSE
`,
  { prefix: "alert" }
);

//type cua cac chuc nang khac gioa tiep vowi server khong can qua redux
export const otherFunctionTypes = createTypes(
  `
    DAT_VE
    TAO_LICH_CHIEU
    DANG_NHAP
    DANG_KY
    CAP_NHAT_THONG_TIN_NGUOI_DUNG
    XOA_NGUOI_DUNG
    THEM_NGUOI_DUNG
    XOA_PHIM
    THEM_PHIM
    CAP_NHAT_PHIM
`,
  { prefix: "otherFunction" }
);
