---
title: 'RubyとJavaScriptにおける正規表現'
date: '2022-05-28'
---

正規表現系のメソッドがいつもごちゃごちゃになって、その場その場でリファレンスを見ているので、このタイミングでまとめてみます。

## 正規表現に対するメソッド体系

| 用途                             | Ruby                           | JavaScript                  |
|--------------------------------|--------------------------------|-----------------------------|
| 正規表現のパターンにマッチした最初の部分を文字列に置換する  | String#sub                     | String.prototype.replace    |
| 正規表現のパターンにマッチしたすべての部分を文字列に置換する | String#gsub                    | String.prototype.replaceAll |
| 正規表現のパターンにマッチする文字のインデックスを返す    | String#=~                      | String.prototype.search     |
| 正規表現のパターンにマッチする文字列を返す          | String#match or Regexp#match   | String.prototype.match      |
| 正規表現のパターンにマッチするかどうかをbooleanで返す | String#match? or Regexp#match? | RegExp.prototype.test       | 
| 正規表現のパターンにマッチする文字列すべてを返す       | String#scan                    | String.prototype.matchAll   |

## ちょっと試してみた
### 正規表現のパターンにマッチした最初の部分を文字列に置換する

```ruby
'ikuma-t, yamada-d, tanaka-p, okurag, tarou-d'.sub(/-/, '~') #=> "ikuma~t, yamada-d, tanaka-p, okurag, tarou-d"
```

```javascript
'ikuma-t, yamada-d, tanaka-p, okurag, tarou-d'.replace(/-/, '~') // 'ikuma~t, yamada-d, tanaka-p, okurag, tarou-d'
```

- [String\#sub \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/String/i/sub.html)
- [String\.prototype\.replace\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

### 正規表現のパターンにマッチしたすべての部分を文字列に置換する

```ruby
'ikuma-t, yamada-d, tanaka-p, okurag, tarou-d'.gsub(/-/, '~') #=> "ikuma~t, yamada~d, tanaka~p, okurag, tarou~d"
```

```javascript
'ikuma-t, yamada-d, tanaka-p, okurag, tarou-d'.replaceAll(/-/g, '~') //  'ikuma~t, yamada~d, tanaka~p, okurag, tarou~d'
```

JavaScriptのString.prototype.replaceAllを使用する際には、グローバルフラグを持つRegExpオブジェクトを指定する必要がある。

- [String\#gsub \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/String/i/gsub.html)
- [String\.prototype\.replaceAll\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

### 正規表現のパターンにマッチする文字のインデックスを返す

```ruby
'ikuma-t' =~ /.*-./ # => 0
'ikumat' =~ /.*-./  # => nil
```

```javascript
'ikuma-t'.search(/.*-./)  // 0
'ikumat'.search(/.*-./) // -1
```

- [String\#=~ \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/String/i/=3d=7e.html)
- [String\.prototype\.search\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/search)

### 正規表現のパターンにマッチする文字列を返す 

```ruby
# Regexp#matchの方を使っています
/.*-./.match('ikuma-t') # => #<MatchData "ikuma-t">
/.*-./.match('ikumat')  # => nil
```

```javascript
'ikuma-t'.match(/.*-./) // [ 'ikuma-t', index: 0, input: 'ikuma-t', groups: undefined ]
'ikumat'.match(/.*-./) // null
```

- [Regexp\#match \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/Regexp/i/match.html)
- [String\.prototype\.match\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match)

### 正規表現のパターンにマッチするかどうかをbooleanで返す 


```ruby
/.*-./.match?('ikuma-t') # => true
/.*-./.match?('ikumat')  # => false
```

```javascript
/.*-./.test('ikuma-t') // true 
/.*-./.test('ikumat')  // false
```

- [Regexp\#match? \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/Regexp/i/match=3f.html)
- [RegExp\.prototype\.test\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

### 正規表現のパターンにマッチする文字列すべてを返す正規表現のパターンにマッチする文字列すべてを返す

```ruby
'ikuma-t'.scan(/[aiueo]/) # => ["i", "u", "a"]
```

```javascript
['ikuma-t'.matchAll(/[aiueo]/g)] 
// [ [ 'i', index: 0, input: 'ikuma-t', groups: undefined ], [ 'u', index: 2, input: 'ikuma-t', groups: undefined ], [ 'a', index: 4, input: 'ikuma-t', groups: undefined ] ]
```

JavaScriptのString.prototype.matchAllを使用する際には、グローバルフラグを持つRegExpオブジェクトを指定する必要がある。

- [String\#scan \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/String/i/scan.html)
- [String\.prototype\.matchAll\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
