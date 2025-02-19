const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");

//API Canvas có thể được sử dụng để tạo đồ hoạ trong các
// trò chơi sử dụng phần tử js và html canvas
// getContext là cho nơi đồ hoạ sẽ hiển thị
const ctx = canvas.getContext("2d");
// innerWidth là 1 thuộc tính của đối tượng window (cửa sổ trình duyệt)
// nó trả về chiều rộng bên trong của vùng hiển trị của trình duyệt
// tính bằng pixel

//Trong JavaScript, innerWidth là một thuộc tính của đối tượng window (cửa sổ trình duyệt). Nó trả về chiều rộng bên trong của vùng hiển thị của trình duyệt, tính bằng pixel.
// Chiều rộng này bao gồm cả phần đệm (padding) nhưng không bao gồm thanh cuộn (nếu có).

//Điểm khác biệt giữa innerWidth, clientWidth và offsetWidth:

// innerWidth: Chiều rộng bên trong của cửa sổ trình duyệt (bao gồm padding, không bao gồm thanh cuộn).
// clientWidth: Chiều rộng bên trong của một phần tử (bao gồm padding, không bao gồm thanh cuộn).
//  offsetWidth: Chiều rộng bên ngoài của một phần tử (bao gồm padding, border và thanh cuộn).
canvas.width = innerWidth;
canvas.height = innerHeight;
// trọng lực khi người chơi nhảy;
const gravity = 0.5;

//trong game , người chơi sẽ có cơ hội vượt qua các trạm
// kiểm soát khác nhau
// bạn sẽ cần theo dõi trạng thái để phát hiện va trạm điểm kiểm tra
let isCheckpointCollisionDetectionActive = true;

// khi bạn đang thiết kế trò chơi
// bạn sẽ cần đảm bảo rằng kích thước của các yếu tố trong trò chơi
// đáp ứng và thích ứng với các kích thước màn hình khác nhâu
const proportionalSize = (size) => {
  // mục tiêu là làm cho trò chơi đáp ứng và nhất quán trực quan trên
  // kích thước màn hình khác nhau
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
};

// Bước tiếp theo là xác định cho người chơi chính của trò chơi
class Player {
  // vị trí , vận tốc , chiều rộng và chiều cao của người chơi
  constructor() {
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  // update chịu trách nhiệm cập nhật vị trí và vận tốc
  // của người chơi khi nó di chuyển trong suốt trò chơi
  update() {
    // khi người chơi di chuyển sang bên phải
    // bạn sẽ cần điều chỉnh đến vận tốc
    this.draw();
    this.position.x += this.velocity.x;
    // khi người chơi nhảy lên bạn sẽ cần thêm vận tốc để điều chỉnh
    this.position.y += this.velocity.y;
    // bây giờ khi người chơi nhảy lên ,
    // nó có thể di chuyển qua chiều cao khung vẽ
    // để khắc phục cho nó 1 điều kiện là ngăn người chơi qua chiều cao của khung vẽ
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
    // người chơi phải đảm bảo rằng người chơi ở trong ranh
    // giới của màn hình canvas và không di chuyển quá xa
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
    // kiểm tra xem vị trí x player có vượt quá cạnh phải của
    // khung vẽ không. Nếu có bạn sẽ cần đặt vị trí X
    // của người chơi thành giá trị tối đa để người chơi
    // không vô tình tắt màn hình khi sang phải
    if (this.position.x >= canvas.width - this.width * 2) {
      this.position = canvas.width - this.width * 2;
    }
  }
}
const player = new Player();
// animate chức năng di chuyển trên trình duyệt
// requestAnimationFrame() web API
const animate = () => {
  //animate chịu trách nhiệm cập nhật vị trí của người chơi
  // và liên tục vẽ nó trên khung vẽ
  requestAnimationFrame(animate);
  // khi người chơi di duyển qua trò chơi
  // bạn phải cần xoá khung vẽ trước khi hiển thị khung tiếp
  // theo của hoạt hình : sử dụng clearRect
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // bước tiếp theo cập nhật vị trí của người chơi
  // khi nó di chuyển trong suốt trò chơi
  player.update();

  // ở phần keys
  // bước tiếp theo là thêm logic để tăng hoặc giảm vận tốc
  // của người chơi dựa trên việc họ di chuyển sang trái hoặc phải
  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5;
  } else if (
    keys.leftKey.pressed &&
    player.position.x > proportionalSize(100)
  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }

  // phần này của platform
  platforms.forEach((platform) => {
    platform.draw();
  });
  //khi người chơi di chuyển sang bên phải , nền tảng không di chuyển với nó
  // để khắc phục sự cố này , bạn sẽ cần cập nhật vị trí X của nền tảng
  // khi trình phát di chuyển trên màn hình
  if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
    platforms.forEach((platform) => {
      platform.position.x -= 5;
    });
    // kiểm tra checkpoint
    checkpoints.forEach((checkpoint) => {
      checkpoint.position.x -= 5;
    });
  } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
    platforms.forEach((platform) => {
      platform.position.x += 5;
    });
    // kiểm tra checkpoint
    checkpoints.forEach((checkpoint) => {
      checkpoint.position.x += 5;
    });
  }
  // lúc này khi bạn đang chơi trò chơi bạn mún nhảy lên các nền tảng thì
  // chúng ta lại nhảy xg nó và k đứng trên nó
  // để khắc phục bạn sẽ cần thêm logic phát hiện va chạm vào trò chơi
  platforms.forEach((platform) => {
    // khi người chơi nhảy xuống bị dừng lại cái nền tảng
    const collisionDetectionRules = [
      // thêm 1 biểu thức boolean kiểm tra xem
      // vị trí Y của người chơi cộng với chiểu cao của người chơi
      // nhỏ hơn hoặc bằng vị trí y của nền tảng
      player.position.y + player.height <= platform.position.y,
      //vị trí của người chơi cộng với chiều cao của người chơi
      // cộng chiều cao vận tốc của người chơi lớn hơn hoặc bằng
      // vị trí y của nền tảng
      player.position.y + player.height + player.velocity.y >=
        platform.position.y,
      // vị trí x của người chơi lớn hơn hoặc bằng  vị trí x nền tảng - width / 2
      player.position.x >= platform.position.x - player.width / 2,
      // vị trí x của người chơi nhỏ hơn hoặc bằng
      // tổng nền tảng vị trí + nền tảng chiều rộng - nền tảng chiều rộng / 3
      player.position.x <=
        platform.position.x + platform.width - platform.width / 3,
    ];
    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }
    // khi người chơi nhảy lên bị đụng cái nền tảng
    const platformDetectionRules = [
      // vị trí của người chơi lớn hơn hoặc bằng
      // vị trí nền tảng x trừ đi 1 nửa chiều rộng của người chơi
      player.position.x >= platform.position.x - player.width / 2,
      // vị trí của người chơi nhỏ hơn hoặc bằng
      // vị trí của nền tảng x + chiều rộng nền tảng - 1 /3 chiều rộng người chơi
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];
    if (platformDetectionRules.every((rule) => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
      return;
    }
  });
  // phần này của Checkpoint
  checkpoints.forEach((checkpoint) => {
    checkpoint.draw();
  });

  checkpoints.forEach((checkpoint) => {
    checkpoint.position.x -= 5;
  });
  // 1 vài bước kiểm tra cuối hiển thị màn hình khi người chơi đạt được điểm kiểm tra
  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9,
      index === 0 || checkpoints[index - 1].claimed === true,
    ];
    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claimed();
    }
    if (index === checkpoints.length - 1) {
      isCheckpointCollisionDetectionActive = false;
      showCheckpointScreen("You reached the final checkpoint!");
      movePlayer("ArrowRight", 0, false);
    } else if (
      player.position.x >= checkpoint.position.x &&
      player.position.x <= checkpoint.position.x + 40
    ) {
      showCheckpointScreen("You reached a checkpoint!");
    }
  });
};

//bước tiếp theo là thêm chức năng sẽ chịu trách nhiệm di chuyển trình phát
// phát trên màn hình
// trong trò chơi người chơi sẽ tương tác với các điểm kiểm tra
// khác nhau
// sau đó bạn sẽ cần dừng chuyển động qua của người chơi trên trục x và y
const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }
  switch (key) {
    // trường hợp nhấn nút bên trái
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x -= xVelocity;
      break;
    // khi người chơi nhảy lên sử dụng phím mũi tên Up,hoặc space hoặc ""
    case "ArrowUp":
    case " ":
    case "Spacebar":
      player.velocity.y -= 8;
      break;
    // trường hợp nhấn nút bên phải
    case "ArrowRight":
      keys.rightKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x += xVelocity;
      break;
  }
};

//Phần quản lý chuyển động của người chơi trong trò chơi.
// bạn sẽ cần theo dõi khi nhấn phím mũi tên trái phải
const keys = {
  rightKey: {
    pressed: false,
  },
  leftKey: {
    pressed: false,
  },
};

const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  // trước khi bạn có thể bắt đầu di chuyển trình phát
  // của mình qua màn hình bạn sẽ cần animate vào trong startGame
  animate();
  //remove player.draw() khi có animate
  //player.draw();
};

// chức năng cuối cùng sẽ hiển thị thông báo điểm kiểm tra
// khi người chơi đạt điểm kiểm tra
const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => {
      checkpointScreen.style.display = "none";
    }, 2000);
  }
};

class Platform {
  constructor(x, y) {
    // tọa độ x , y
    // sử dụng thuộc tính tốc ký bỏ qua thuộc tính giống nhau
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
// tạo ra danh sách position
const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

class CheckPoint {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    // thuộc tính this.claimed sẽ được sử dụng để kiểm tra xem người chơi
    // đã đạt đến điểm kiểm tra
    this.claimed = false;
  }
  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}
// tạo 1 mảng mới để so sánh
const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

startBtn.addEventListener("click", startGame);
// lấy sự kiện từ bàn phím key
window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
  console.log(key);
});

window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});
