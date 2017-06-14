/**
 * Created by mshuang on 2017/6/14.
 */

var btn = document.getElementById('button');//ִ�а�ť
var direction_value = document.getElementById('direction');//ָ���
var draw = document.getElementsByTagName('canvas')[0];//��ȡ����
var direction = ['front','right','back','left'];
var i,j;
var dir = 0;//����������±�

var positionY = 0; //canvasԭ��������λ��
var positionX = 0; //canvasԭ���������λ��

(function(){
    //ȷ�������֧��canvas
    if(draw.getContext) {
        //����context����
        var context = draw.getContext("2d");
        //����·��
        context.beginPath();
        //�����ı�
        context.font = "bold 14px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";

        //����
        for (i = 30, j = i; i < 360; i = i + 30, j++) {
            context.moveTo(30, i);
            context.lineTo(330, i);
            context.moveTo(i, 30);
            context.lineTo(i, 330);
            if (j <= 10) {
                context.fillText(j, i + 15, 15);
                context.fillText(j, 15, i + 15);
            }
        }
        context.translate(150, 150);
        positionX += 150;
        positionY += 150;
        context.fillStyle = "#f00";
        context.fillRect(0, 5, 30, 25);
        context.fillStyle = 'blue';
        context.fillRect(0, 0, 30, 5);
        //��ʾ·��
        context.stroke();
    }
})();

var control = function(order){
    switch (order){
        case "GO":
            if(direction[dir] == "front" && positionY == 30){
                alert("��ı䷽��");
            }else if(direction[dir] == "back" && positionY == 330){
                alert("��ı䷽��");
            }else if(direction[dir] == "left" && positionX == 30){
                alert("��ı䷽��");
            }else if(direction[dir] == "right" && positionX == 330){
                alert("��ı䷽��");
            }else{
                    changePosition();
            }
            break;
        case "TURN LEFT":
            if(direction[dir] == "front"){
                positionY = positionY+30;
            }
            if(direction[dir] == "right"){
                positionX = positionX-30;
            }
            if(direction[dir] == "back"){
                positionY = positionY-30;
            }
            if(direction[dir] == "left"){
                positionX = positionX+30;
            }
            changeDirection(-Math.PI/2);
            break;
        case "TURN RIGHT":
            if(direction[dir] == "front"){
                positionX = positionX+30;
            }
            if(direction[dir] == "right"){
                positionY = positionY+30;
            }
            if(direction[dir] == "back"){
                positionX = positionX-30;
            }
            if(direction[dir] == "left"){
                positionY = positionY-30;
            }
            changeDirection(-Math.PI/2);
            break;
        case "TURN BACK":
            if(direction[dir] == "front"){
                positionX = positionX + 30;
                positionY = positionY + 30;
            }
            if(direction[dir] == "right"){
                positionX = positionX - 30;
                positionY = positionY + 30;
            }
            if(direction[dir] == "back"){
                positionX = positionX - 30;
                positionY = positionY - 30;
            }
            if(direction[dir] == "left"){
                positionX = positionX - 30;
                positionY = positionY + 30;
            }
            changeDirection(Math.PI);
            break;
        default :
    }
}
//reg��ʾת���Ķ��飬˳ʱ��Ϊ������ʱ��Ϊ��
var changeDirection = function(reg){
    var context = draw.getContext("2d");
    context.translate(15,15);
    context.rotate(reg);
    context.translate(-15,-15);
    context.clearRect(0,0,30,30);
    context.fillStyle = "#f00";
    context.fillRect(0,5,30,25);
    context.fillStyle="blue";
    context.fillRect(0,0,30,5);
    //n��ʾͼ��ת����n��90��
    var n = reg/(Math.PI/2);
    //��������ķ�λ
    dir = dir + n + 4;
    dir = dir % 4;
}

var changePosition = function(){
    var context = draw.getContext("2d");
    context.clearRect(0,0,30,30);
    context.moveTo(30,0);
    context.lineTo(30,0);
    context.moveTo(30,30);
    context.lineTo(30,30);
    context.moveTo(0,30);
    context.closePath();
    context.stroke();
    context.translate(0,-30)
    context.fillStyle = "#f00";
    context.fillRect(0, 5, 30, 25);
    context.fillStyle = "blue";
    context.fillRect(0, 0, 30, 5);
    if(direction[dir] == "front" ) positionY = positionY -30;
    if(direction[dir] == "right") positionX = positionX +30;
    if(direction[dir] == "back") positionY = positionY +30;
    if(direction[dir] == "left") positionX = positionX -30;
}

//��ť���¼�
btn.addEventListener('click',function(){
    control(direction_value.value);
},false)