var num = 0

function incrementCount(current_count){
    num = num + 1;
    document.getElementById('box1').innerHTML= String(num)

    console.log(num)
}

document.getElementById("button").addEventListener('click',function(){
    incrementCount(num);
});