/**
 * 在 haystack 字符串中查找 needle 字符串第一次出现的位置
 * KMP 算法，时间复杂度 O(n + m)
 *
 * @param {string} haystack 主串
 * @param {string} needle   模式串
 * @return {number}         第一次出现的起始下标，没找到返回 -1；needle 为空时返回 0
 */
var strStr = function(haystack, needle) {
    // 如果模式串为空，按照题目要求直接返回 0
    if (needle.length === 0) {
        return 0;
    }

    // 构建 next 数组（也叫部分匹配表、失配函数）
    // next[i] 表示模式串前 i+1 长度的子串的最长相同前后缀的长度
    let next = [0];
    // j 用来记录当前匹配的前缀长度
    let j = 0;

    // 从模式串的第二个字符开始，计算 next[i]
    for (let i = 1; i < needle.length; i++) {
        // 当当前字符不匹配时，沿着 next 数组往前回退（寻找更短的可能匹配前缀）
        while (j > 0 && needle[i] !== needle[j]) {
            // 退到上一个最长相同前后缀的位置
            j = next[j - 1]; // 回退到上一个位置，这个位置的值就告诉我们下一个可能的匹配前缀长度
        }
        // 如果当前字符和前缀的下一个字符匹配，前缀长度加一
        if (needle[i] === needle[j]) {
            j++;
        }
        // 将计算好的前缀长度存入 next 数组
        next[i] = j;
    }

    // 使用 KMP 主循环，在主串 haystack 中查找模式串 needle
    j = 0; // 主串匹配指针，重置 j
    for (let i = 0; i < haystack.length; i++) {
        // 当当前字符不匹配时，同样沿着 next 数组回退 j
        while (j > 0 && haystack[i] !== needle[j]) {
            j = next[j - 1];
        }
        // 匹配则前进
        if (haystack[i] === needle[j]) {
            j++;
        }
        // 当 j 达到模式串长度时，说明完全匹配
        if (j === needle.length) {
            // 返回匹配的起始下标：当前 i 减去模式串长度再加 1
            return i - needle.length + 1;
        }
    }

    // 遍历结束仍未找到，返回 -1
    return -1;
};
