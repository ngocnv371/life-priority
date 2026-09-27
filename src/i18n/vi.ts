import type { Dict } from "./en";

/**
 * Vietnamese copy. Typed as `Dict`, so adding a key to `en.ts` without
 * translating it here is a compile error rather than a missing string on stage.
 *
 * Translation notes:
 *  - "the feed" -> "dòng tin": the open-ended social feed that eats unclaimed time.
 *  - "rock / pebble / sand" -> "đá / sỏi / cát", keeping the classic jar metaphor.
 *  - "craft" -> "tay nghề": the deep, usually-unpaid work that is only yours.
 *  - "overhead" -> "việc vặt": the fixed background cost of having a life.
 */
export const vi: Dict = {
  /* ------------------------------------------------------------- shell -- */
  "brand": "Thứ Tự Ưu Tiên Của Cuộc Đời",
  "hud.navigate": "điều hướng",
  "hud.fullscreen": "toàn màn hình",
  "hud.autoAdvance": "Tự chuyển tiếp",
  "hud.back": "Trước",
  "hud.next": "Tiếp",
  "hud.langLabel": "Ngôn ngữ",

  /* -------------------------------------------------- section metadata -- */
  "sec.title": "Mở đầu",
  "sec.framing": "Đặt vấn đề",
  "sec.day": "Một ngày",
  "sec.dayDebrief": "Tổng kết ngày",
  "sec.jar": "Cái hũ",
  "sec.jarDebrief": "Tổng kết hũ",
  "sec.horizon": "Tầm nhìn",
  "sec.rules": "Quy tắc",

  "cap.title":
    "Mọi thứ về sau đều đứng trên một phép tính khó chịu: *24 giờ, tổng cộng, cho tất cả mọi thứ.*",
  "cap.framing":
    "Hai phần ba của một ngày đã có chủ. Bài giảng này nói về một phần ba còn lại — và về thứ tự bạn tiêu nó.",
  "cap.dayDebrief":
    "Thanh đầu tiên không có gì được *quyết định*. Tất cả chỉ là *mặc định*. Đó là khác biệt đáng mang về.",
  "cap.jarDebrief":
    "Cùng một cái hũ, cùng đồ, cùng tổng thể tích. Chỉ thứ tự thay đổi — và chính thứ tự quyết định ai bị mất.",
  "cap.horizon":
    "Một ngày cứ thế lặp lại. Qua mười năm, những giờ bỏ ngỏ không còn giống một sai số làm tròn nữa, mà giống hẳn một cuộc đời thứ hai.",
  "cap.rules":
    "Ba quy tắc đủ ngắn để nhớ vào sáng thứ Hai — và đủ cụ thể để làm ngay trước khi tuần mới bắt đầu.",

  /* ------------------------------------------------------------ title -- */
  "title.kicker": "Một bài giảng về thứ tự, đòn bẩy và sự chú ý",
  "title.heading": "Thứ Tự Ưu Tiên Của Cuộc Đời",
  "title.sub":
    "Không phải một danh sách mục tiêu. Mà là một *cái hộp*, và một quyết định về việc điều gì vào trước.",

  /* ---------------------------------------------------------- framing -- */
  "framing.kicker1": "Bản kiểm kê",
  "framing.beat1": "Bạn có *24 giờ*.",
  "framing.beat2a": "Không phải 24 giờ cho mọi thứ.",
  "framing.beat2b": "24 giờ. Tổng cộng. Cho tất cả mọi thứ.",
  "framing.beat3": "Giấc ngủ và công việc sẽ đòi *hai phần ba*.",
  "framing.stat.sleep": "8h ngủ",
  "framing.stat.work": "8h làm việc",
  "framing.stat.overhead": "2h việc vặt",
  "framing.stat.left": "6h còn lại",
  "framing.kicker2": "Và thế là bài toán thu lại còn một câu",
  "framing.beat4": "Câu hỏi duy nhất là: *điều gì vào trước?*",

  /* ------------------------------------------------------ day debrief -- */
  "daydebrief.heading": "Một ngày của bạn không phải danh sách. Nó là một *cái hộp*.",
  "daydebrief.capActual": "Một ngày điển hình thực tế trông như thế này",
  "daydebrief.capAllocated": "Cũng ngày đó, khi bạn chia chỗ trước",
  "daydebrief.seg.sleep": "ngủ",
  "daydebrief.seg.work": "làm việc",
  "daydebrief.seg.overhead": "việc vặt",
  "daydebrief.seg.feed": "dòng tin",
  "daydebrief.seg.move": "vận động",
  "daydebrief.seg.people": "người thân",
  "daydebrief.seg.craft": "tay nghề",
  "daydebrief.seg.still": "tĩnh lặng",
  "daydebrief.kicker": "Cơ chế",
  "daydebrief.punch":
    "Thanh đầu tiên không có gì được ~quyết định~. Tất cả chỉ là *mặc định*.",

  /* ------------------------------------------------------ jar debrief -- */
  "jardebrief.heading":
    "Cùng một cái hũ. Cùng 3 tảng đá, 5 nắm sỏi, 10 nắm cát.",
  "jardebrief.sand": "Đổ cát trước",
  "jardebrief.rocks": "Đặt đá trước",
  "jardebrief.footnoteSand":
    "45 đơn vị vật liệu mịn đã lắng xuống trước. Hai tảng đá vào được. Tảng thứ ba *không còn chỗ*.",
  "jardebrief.footnoteRocks":
    "Đá để lại những khoảng trống. Sỏi và cát lấp vào đó với *giá bằng một nửa*. Mọi thứ đều vừa.",
  "jardebrief.filled": "hũ đã đầy",
  "jardebrief.punch":
    "Bạn không bao giờ mất những điều lớn lao vì những điều lớn lao.",
  "jardebrief.layerRock": "đá",
  "jardebrief.layerPebble": "sỏi",
  "jardebrief.layerSand": "cát",

  /* ---------------------------------------------------------- horizon -- */
  "horizon.kicker": "Cùng một câu hỏi, ở mọi quy mô",
  "horizon.heading": "Cuộc đời bạn là một ngày như thế, lặp lại.",
  "horizon.p1": "Một ngày",
  "horizon.p2": "Một tuần",
  "horizon.p3": "Một năm",
  "horizon.p4": "Mười năm",
  "horizon.unit": "giờ",
  "horizon.callout":
    "giờ bỏ ngỏ trong mười năm — nếu bạn chỉ giữ được ~8 giờ mỗi ngày~. Đó là hơn ba năm sống trọn vẹn. Nguồn tài nguyên lớn nhất mà bạn từng sở hữu.",

  /* ------------------------------------------------------------ rules -- */
  "rules.kicker": "Ba quy tắc trụ được qua một tuần thật",
  "rules.r1.title": "Gọi tên những tảng đá trước.",
  "rules.r1.note":
    "Trước khi tuần bắt đầu, hãy quyết định điều gì không thể dịch chuyển. Viết nó ra.",
  "rules.r2.title": "Trả tiền cho những thứ nhỏ sau cùng.",
  "rules.r2.note":
    "Vật liệu mịn chỉ rẻ khi nó lấp vào khoảng trống mà những thứ lớn để lại.",
  "rules.r3.title": "Nhận lấy thời gian, hoặc mất nó.",
  "rules.r3.note":
    "Chỗ nào bạn bỏ trống, dòng tin sẽ lấy. Lặng lẽ, và mặc định.",
  "rules.punch": "Ưu tiên không phải là một cảm giác. Nó là một thứ tự.",

  /* ----------------------------------------------------- puzzle 1: day -- */
  "day.puzzleLabel": "Câu đố 01",
  "day.titleA": "Cái hộp",
  "day.titleB": "24 giờ",
  "day.lede":
    "Mười tám giờ đã bị tiêu mất. *{hours}* giờ còn lại thực sự thuộc về bạn — và bốn khối đang tranh nhau chỗ đó. Kéo một khối vào ngày, hoặc chỉ cần bấm.",
  "day.yourBlocks": "Các khối của bạn",
  "day.hFree": "còn {n}h",
  "day.alreadySpent": "Đã tiêu mất",
  "day.fixed": "cố định",
  "day.notNegotiable": "hôm nay không thương lượng",
  "day.inDay": "đã ở trong ngày — bấm để bỏ ra",
  "day.whereWent": "Ngày đã đi đâu",
  "day.meterFixed": "Cố định",
  "day.meterChosen": "Đã chọn",
  "day.meterUnclaimed": "Bỏ ngỏ",
  "day.assigned": "đã xếp {claimed}h / 24h",
  "day.feed": "dòng tin",
  "day.tipBlocked": "Ngày đã hết chỗ",
  "day.tipRemove": "Bấm để bỏ khối này ra khỏi ngày",

  "day.block.sleep.name": "Ngủ",
  "day.block.sleep.blurb":
    "Tám giờ. Não bạn sắp xếp lại cả ngày trong lúc bạn vắng mặt.",
  "day.block.work.name": "Công việc / Học tập",
  "day.block.work.blurb":
    "Thứ bạn được trả tiền để làm, hoặc thứ bạn đang học để làm.",
  "day.block.chores.name": "Đi lại & việc nhà",
  "day.block.chores.blurb":
    "Thứ thuế phải trả vì bạn có một cơ thể, một mái nhà và một nơi ở.",
  "day.block.body.name": "Vận động",
  "day.block.body.blurb":
    "Một giờ mà nhịp tim quan trọng hơn hộp thư đến.",
  "day.block.people.name": "Người thân",
  "day.block.people.blurb":
    "Hai giờ với những người sẽ nhận ra nếu bạn biến mất.",
  "day.block.craft.name": "Tay nghề",
  "day.block.craft.blurb":
    "Hai giờ cho thứ chỉ bạn mới làm được. Thường thì không được trả tiền.",
  "day.block.stillness.name": "Tĩnh lặng",
  "day.block.stillness.blurb":
    "Một giờ, không mạng, không làm gì tạo ra được chỉ số nào.",

  "day.verdict.perfect.head": "Không rò rỉ gì",
  "day.verdict.perfect.body":
    "Cả {hours} giờ tự do đều được gọi tên. Ngày đó tốn đúng những gì bạn đã quyết.",
  "day.verdict.small.head": "{n}h đã chảy vào dòng tin",
  "day.verdict.small.body":
    "Còn cứu được. Nhưng để ý khối nào chưa được xếp — dòng tin lấy chỗ của khối đó, không phải của ai khác.",
  "day.verdict.half.head": "{n}h đã chảy vào dòng tin",
  "day.verdict.half.body":
    "Hơn nửa ngày tự do của bạn chưa từng được giao cho việc gì. Nó vẫn bị tiêu mất.",
  "day.verdict.lost.head": "{n}h đã chảy vào dòng tin",
  "day.verdict.lost.body":
    "Bạn có {hours} giờ tự do và gần như không giữ được giờ nào. Không có gì bị từ chối — chỉ đơn giản là chưa từng được nhận.",
  "day.reset": "Xếp lại từ đầu",
  "day.leaky": "Xem một ngày rò rỉ",

  /* ----------------------------------------------------- puzzle 2: jar -- */
  "jar.puzzleLabel": "Câu đố 02",
  "jar.titleA": "Đá lớn, sỏi và",
  "jar.titleB": "cát",
  "jar.lede":
    "3 tảng đá. 5 nắm sỏi. 10 nắm cát. Tổng thể tích danh nghĩa *{nominal}* trong một cái hũ chỉ chứa *{capacity}*. Bài toán có lời giải — nhưng chỉ với một kiểu thứ tự.",
  "jar.onBench": "Trên bàn",
  "jar.clickToPlace": "bấm để đặt",
  "jar.each": "{c} mỗi nắm",
  "jar.allUsed": "đã dùng hết",
  "jar.noRoom": "hết chỗ",
  "jar.remaining": "còn {n} · giá {c}",

  "jar.item.r1.name": "Sức khỏe",
  "jar.item.r1.blurb": "Cơ thể mang theo mọi kế hoạch khác của bạn.",
  "jar.item.r2.name": "Người thân",
  "jar.item.r2.blurb": "Vài mối quan hệ không phải là tùy chọn.",
  "jar.item.r3.name": "Tay nghề",
  "jar.item.r3.blurb":
    "Công việc bạn vẫn làm kể cả khi không ai trả tiền cho bạn.",
  "jar.item.p1.name": "Sỏi ×5",
  "jar.item.p1.blurb":
    "Email, những cuộc họp lẽ ra chỉ cần một dòng ghi chú, việc vặt, giấy tờ, và sự gấp gáp của người khác.",
  "jar.item.s1.name": "Cát ×10",
  "jar.item.s1.blurb":
    "Một lần lướt ở đây, một thông báo ở kia. Từng thứ một thì chẳng đáng gì.",

  "jar.badge.on": "Đang lấp khe · sỏi ×{pebble} · cát ×{sand}",
  "jar.badge.off": "Chưa có đá trong hũ · giá đầy đủ",
  "jar.badge.tip": "Vật liệu mịn lắng vào những khoảng trống mà đá để lại.",

  "jar.filled": "đã đầy",
  "jar.free": "còn trống",
  "jar.rocks": "đá",
  "jar.leftOut": "còn {n} đơn vị bên ngoài",
  "jar.spillEmpty": "Mọi thứ đều đã vào trong. Trên bàn không còn gì.",

  "jar.orderTitle": "Thứ tự bạn đã đặt",
  "jar.placed": "đã đặt {n}",
  "jar.orderEmpty":
    "thứ tự của bạn sẽ hiện ở đây — thứ tự là toàn bộ trò chơi",

  "jar.pricingTitle": "Cách tính giá",
  "jar.pricing1": "Một ~tảng đá~ luôn tốn đủ 25 dù đặt ở đâu.",
  "jar.pricing2":
    "~Sỏi và cát~ rẻ hơn khi đá đã tạo ra khe cho chúng lắng vào.",
  "jar.pricing3":
    "Đổ vật liệu mịn ~trước~ thì bạn trả giá đầy đủ — và không còn khe trống nào cho những thứ lớn.",

  "jar.verdict.empty.head": "Hũ vẫn còn trống",
  "jar.verdict.empty.body":
    "Bắt đầu bằng thứ bạn nhất định không chịu mất. Rồi để ý giá của vật liệu mịn thay đổi dần.",
  "jar.verdict.perfect.head": "Đầy hũ, không thừa gì",
  "jar.verdict.perfect.body":
    "Cả ba tảng đá, năm nắm sỏi, mười nắm cát — đúng {capacity} đơn vị. Cùng đồ, cùng hũ: chỉ thứ tự thay đổi.",
  "jar.verdict.rocksOnly.head": "Đá vào được. Còn chi tiết thì không",
  "jar.verdict.rocksOnly.body":
    "Còn {leftOut} đơn vị trên bàn. Mọi tảng đá đều sống sót, nhưng sỏi và cát bị chen ra vì đến sau.",
  "jar.verdict.missing.head": "Còn {n} tảng đá bên ngoài",
  "jar.verdict.missing.body":
    "Đá là thứ bạn không thể thay thế. Vật liệu mịn đổ trước phải trả giá đầy đủ và không để lại khe trống — nên những thứ lớn không có chỗ để ngồi.",
  "jar.reject.head": "Không vừa",
  "jar.reject.body":
    "Hũ đã đầy. Muốn thêm gì, phải bỏ ra một thứ đang ở trong.",
  "jar.reset": "Làm hũ rỗng",
  "jar.seed": "Xem lỗi kinh điển",
};
