<?php
    // $user_input = $_GET["keywords"];
    $link = $_POST["link"];
    $details_path = $_POST["details_path"];
    $picture_link = $_POST["picture_link"];
    $picture_xpath = $_POST["picture_xpath"];

    $actor_data = array();

    function start($link){
      $ch = curl_init();
       curl_setopt($ch, CURLOPT_URL, $link);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $info = curl_exec($ch);
        $html = new DOMDocument();
       @$html->loadHTML($info);
       $html->normalize();
       $xpath = new DOMXPath($html);
       curl_close($ch);
       return $xpath;
    };

    function get_info($path,$xpath_photo,$actor_data){
       global $start,$link,$picture_link;
        $xpath = start($link);
       if (!($xpath->query($path)->length)){
           $actor_data['error_info'] = "抱歉！未找到此演员。";
       }
       else{
           $actor_data['base_info'] = $xpath->query($path)[0]->nodeValue;
           $photo_info = start($picture_link);
           $items = $photo_info->query($xpath_photo);
           if($items->length){
              $actor_data["photo"] = array();
             foreach ($items as $value) {
              array_push($actor_data["photo"], str_replace("_140.jpg",".jpg",$value->nodeValue)) ;
             };
           }
           else{
            $actor_data["photo"] = ["../source/404.png"];
           }
       };

        echo json_encode($actor_data) ;

    };
    get_info($details_path,$picture_xpath,$actor_data);
?>


