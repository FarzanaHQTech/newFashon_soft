<template >
   <ul class="navbar-nav nav_mobile">
    <!--<li><i class="fa fa-close" style="font-size: 30px;"></i></li>-->
    <!-- <li class="nav-item"><a href="{{ route('home')}}" class="nav-link active">Home</a></li>
    <li class="nav-item">
        <a href=" {{ route('shop')}} " class="nav-link">SHOP PRODUCT</a>
    </li>
    <li class="nav-item">
        <a href="{{ route('newProduct')}}" class="nav-link">NEW PRODUCT</a>
    </li>
    <li class="nav-item">
        <a href="{{ route('flashProduct')}}" class="nav-link">FLASH SELL</a>
    </li>
    @foreach($cats as $cat)
    @php
        $count=$cat->sub_categories->count();
    @endphp
    <li class="nav-item {{$count?'has_menu':''}}">
        <a href="{{ route('shop',['cat_id'=> $cat->id])}}" class="nav-link">
           <img src="{{ asset('posadmin/images/category/'.$cat->image)}}" alt="" width="20">  {{ $cat->name}}
        </a>
        @if($count)
        <ul class="inner_menu">
            @foreach($cat->sub_categories as $sub)
            <li class="nav-item">
                <a href="{{ route('shop',['cat_id'=> $cat->id, 'sub_cat_id'=> $sub->id])}}" class="nav-link">{{$sub->name}}</a>
            </li>
            @php
                $subcount=$sub->sub_categories->count();
            @endphp
            <ul class="inner_menu_child">
                @foreach($sub->sub_categories as $child)
                <li class="nav-item {{$subcount?'has_child_menu':''}} "  style="padding: 5px 0px;">
                    <a href="{{ route('shop',['cat_id'=> $cat->id, 'sub_cat_id'=> $sub->id, 'child_cat_id'=>$child->id])}}" class="nav-link">{{$child->name}}</a>
                </li>
                @endforeach
            </ul>
            @endforeach
        </ul>
        @endif
    </li>
    @endforeach -->
        
    
      
</ul>

</template>
<script setup>

</script>
<style scoped>
      .nav_mobile{
        max-height: calc(100vh - 86px);
        overflow-y: auto;
    }
</style>