const { createHash } = require('crypto');
function hash(node){
  return createHash('sha256').update(node).digest('hex');
}
const nodes = ['a', 'b', 'c', 'd', 'e'];
let hashNodes = nodes.map(val => hash(val));
let merkleTree=[]
merkleTree.push(hashNodes);
function buildTree(nodes){
    if (nodes.length <= 1){
        return nodes[0];
    }
    const next = [];
    if (nodes.length % 2 !== 0){
        nodes.push(nodes[nodes.length - 1]);
    }
    for (let i = 0; i < nodes.length; i += 2) {
        let left = nodes[i];
        let right = nodes[i + 1];
        let hashValue = hash(left + right);
        next.push(hashValue);
    }
    merkleTree.push(next);
    return buildTree(next);
}
const merkle = buildTree(hashNodes);
let target='e';
let height=-1;
let targetHash=hash(target);
function indexFinding(targetHash){
    height++;
    for(let i=0;i<merkleTree[height].length;i++){
        if(targetHash===merkleTree[height][i]){
            return i;
        }
    }
    return -1;
}
function check(targetHash){
    let index=indexFinding(targetHash);
    let left=0,right=0,hashNod=0;
    if(index!==-1){
        if(height===merkleTree.length){
            return "NO";
        }
        if(index%2===0){
            left=merkleTree[height][index];
            right=merkleTree[height][index+1];
        }
        else{
            left=merkleTree[height][index-1];
            right=merkleTree[height][index];
        }
        hashNod=hash(left+right);
        if(hashNod===merkle){
            return "YES";
        }
    }
    else{
        return "NO";
    }
    return check(hashNod);
}
let valid=check(targetHash);
console.log(valid);