document.addEventListener("DOMContentLoaded", function() {
    const sceneEl = document.querySelector('a-scene');
    let arSystem;
  
    sceneEl.addEventListener('loaded', function () {
      arSystem = sceneEl.systems["mindar-image-system"];
      arSystem.start();
    });
  
    const exampleTarget = document.querySelector('#example-target');
    const examplePlane = document.querySelector('#example-plane');

    const pauseKeepVideoButton = document.querySelector("#example-pause-keep-video-button");
    const unpauseButton = document.querySelector("#example-unpause-button");
  
    let newImageAdded = false; // 控制是否已添加图片
  
    // 绑定按钮功能
    pauseKeepVideoButton.addEventListener('click', () => arSystem.pause(true));
    unpauseButton.addEventListener('click', () => arSystem.unpause());
  
    // 目标检测事件
    exampleTarget.addEventListener("targetFound", () => console.log("target found"));
    exampleTarget.addEventListener("targetLost", () => console.log("target lost"));
  
    // 点击原始图片后，在左侧创建新图片
    let grayRectangle = null; // 用于存储灰色长方形
    let isRectangleVisible = false; // 记录当前是否已显示
    examplePlane.addEventListener("click", () => {
        if (isRectangleVisible) {
          // 如果已经可见，则移除
          if (grayRectangle) {
            exampleTarget.removeChild(grayRectangle);
            grayRectangle = null;
          }
        } else {
          // 如果不可见，则创建并添加
          grayRectangle = document.createElement("a-plane");
          grayRectangle.setAttribute("position", "-1.2 0 0"); // 位置在左侧
          grayRectangle.setAttribute("height", "0.7"); // 比原始plane略高
          grayRectangle.setAttribute("width", "0.4"); // 更窄一些
          grayRectangle.setAttribute("color", "gray"); // 颜色为灰色
          grayRectangle.setAttribute("opacity", "1"); // 完全不透明
          grayRectangle.classList.add("clickable"); // 让它也能被点击
          exampleTarget.appendChild(grayRectangle);
        }
        isRectangleVisible = !isRectangleVisible; // 反转状态
      });


  });
  