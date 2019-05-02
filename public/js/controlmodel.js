var q1 = 0; q2 = 0;
l1 = 30;
l2 = 5;
var main_gltf;

var ControlModel = function(gltf_data) {
    main_gltf = gltf_data
    console.log(main_gltf)
}


ControlModel.prototype = (function(){

  function onInit() {
    document.addEventListener("keydown", button, false);
  }


  function updatePos(q1, q2){
    main_gltf.scene.traverse(function(c){
      if(c instanceof THREE.SkinnedMesh){
        c.skeleton.bones[0].rotation.y = q1 / 10
        c.skeleton.bones[1].rotation.z = q2 / 10
        
        fk(q1, q2);
      }
    })
  }


  function button(key){
    if(key.keyCode == 65){ // Key A
        q1--;
    }
    if(key.keyCode == 68){ // Key D
        q1++;
    }
    if(key.keyCode == 87){ // Key W
        q2++;
    }
    if(key.keyCode == 88){ // Key X
        q2--;
    }
    updatePos(q1, q2)
  }



  function ik(x, y, z){
      s2 = z/l2;
      c2 = math.sqrt(1-(s2*s2))
      t2 = math.atan2(s2, c2) / 2 / math.PI * 360

      a = (l1 + l2 * c2)
      c1 = x / a
      s1 = y / a
      t1 = math.atan2(s1, c1) / 2 / math.PI * 360
      
  }
  

  function sc(ct, val){
    if(ct == "c"){//cos
      return math.cos( math.unit(val, 'deg') );
    }else{
      return math.sin( math.unit(val, 'deg') );
    }
  }

	
	function fk(t1, t2){
			px = l2 * sc("c", t1) * sc("c", t2) + l1 * sc("c", t1);
			py = l2 * sc("s", t1) * sc("c", t2) + l1 * sc("s", t1);
			pz = l2 * sc("s", t2)

      console.log(px.toFixed(2), py.toFixed(2) , pz.toFixed(2))

			ik(px, py, pz)
	}



  return {
    init: onInit
  }
})();
