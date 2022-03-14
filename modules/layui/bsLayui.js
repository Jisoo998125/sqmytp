/**
 * @method openDialog
 * @param {Array} area 
 * @param {string} content 
 */
function openDialog(area, content) {
    var res = {
        closeBtn: 1,
        anim: 0,
        type: 2,
        area: area,
        content: content,
    };
    top.layer.open(res);
};