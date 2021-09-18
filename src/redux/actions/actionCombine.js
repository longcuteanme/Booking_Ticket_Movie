import { createActions } from "reduxsauce";

//su dung action.Creators de tap action

//action of danhSachBannerReducer
export const danhSachBannerAction = createActions(
  {
    get: ["listBanner"],
    getSaga: null,
  },
  { prefix: "danhSachBanner" }
);

//action of danhSachCumRapTheoHeThongReducer
export const danhSachCumRapTheoHeThongAction = createActions(
  {
    get: ["listDanhSachCumRapTheoHeThong"],
    getSaga: ['maHeThongRap'],
  },
  { prefix: "danhSachCumRapTheoHeThong" }
);

//action of alertReducer
export const alertAction = createActions(
  {
    open: ["message","description","alertType"],
    close: null,
  },
  { prefix: "alert" }
);

//action of danhSachLichChieuTheoHeThongReducer
export const danhSachLichChieuTheoHeThongAction = createActions(
  {
    get: ["listDanhSachLichChieuTheoHeThong"],
    changeIndex: ["pickedIndex"],
    getSaga: ["maHeThongRap"]
  },
  { prefix: "danhSachLichChieuTheoHeThong" }
);

//action of danhSachPhimReducer
export const danhSachPhimAction = createActions(
  {
    get: ["danhSachPhim"],
    getSaga: null,
  },
  { prefix: "danhSachPhim" }
);

//action of danhSachPhongVeReducer
export const danhSachPhongVeAction = createActions(
  {
    get: ["thongTinPhim","danhSachGhe"],
    getSaga: ["id"],
  },
  { prefix: "danhSachPhongVe" }
);

//action of loadingReducer
export const loadingAction = createActions(
  {
    display:null,
    hide: null,
  },
  { prefix: "loading" }
);

//action of loadingTablePhimReducer
export const loadingTablePhimAction = createActions(
  {
    display:null,
    hide: null,
  },
  { prefix: "loadingTablePhim" }
);

//action of loadingTableQuanTriReducer
export const loadingTableQuanTriAction = createActions(
  {
    display:null,
    hide: null,
  },
  { prefix: "loadingTableQuanTri" }
);

//action of localeReducer
export const localeAction = createActions(
  {
    change:["value"]
  },
  { prefix: "locale" }
);

//action of menuQuanTriReducer
export const menuQuanTriAction = createActions(
  {
    set:["openKeys"]
  },
  { prefix: "menuQuanTri" }
);

//action of modalReducer
export const modalAction = createActions(
  {
    open:["src"],
    close:null
  },
  { prefix: "modal" }
);

//action of quanTriNguoiDungReducer
export const quanTriNguoiDungAction = createActions(
  {
    get:["danhSachNguoiDungQuanTri"],
    getSaga:["model"]
  },
  { prefix: "quanTriNguoiDung" }
);

//action of quanTriPhimReducer
export const quanTriPhimAction = createActions(
  {
    get:["danhSachPhimQuanTri"],
    getSaga:["model"]
  },
  { prefix: "quanTriPhim" }
);

//action of thongTinHeThongRapReducer
export const thongTinHeThongRapAction = createActions(
  {
    get:["listHeThongRap"],
    getSaga:["chucNang"]
  },
  { prefix: "thongTinHeThongRap" }
);

//action of thongTinPhimReducer
export const thongTinPhimAction = createActions(
  {
    get:["thongTinChiTietPhim"],
    getSaga:["maPhim"]
  },
  { prefix: "thongTinPhim" }
);

//action of thongTinTaiKhoanReducer
export const thongTinTaiKhoanAction = createActions(
  {
    get:["thongTinTaiKhoan"],
    getSaga:null
  },
  { prefix: "thongTinTaiKhoan" }
);

//action cua cac chuc nang khac gioa tiep vowi server khong can qua redux
export const otherFunctionAction = createActions(
  {
    datVe:["datVe","history"],
    taoLichChieu:["model"],
    dangNhap:["dangNhap","history"],
    dangKy:["model","changeDangNhap"],
    capNhatThongTinNguoiDung:["model","history","layDuLieu"],
    xoaNguoiDung:["model","layDuLieu"],
    themNguoiDung:["model","layDuLieu"],
    xoaPhim:["maPhim","layDuLieu"],
    themPhim:["model","layDuLieu"],
    capNhatPhim:["model","layDuLieu"],
  },
  { prefix: "otherFunction" }
);
